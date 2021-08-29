/*
    2021-08-23
    네이버 로그인 구현
    Passport 전략 : 네아버
*/
const express = require('express');
const router = express.Router();

// JWT
const { createJWT } = require('./JWT');

const path = require('path');
const ENV_PATH = path.resolve(__dirname, "../.env");
require('dotenv').config({path : ENV_PATH});


const passport = require("passport");
const NaverStrategy = require('passport-naver').Strategy;
const { create } = require('./Create_User');

passport.use(
    new NaverStrategy(
        {
            clientID: process.env.NAVER_CLIENT_ID,
            clientSecret : process.env.NAVER_CLIENT_SECRET,
            callbackURL: '/auth/naver/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            console.log(profile)
            const {
                id,
                nickname,
                gender
            } = profile._json;
            create({
                uid : id,
                name : nickname,
                gender,
                provider : 'naver'
            }).then(user => {
                return done(null, user);
            }).catch(err => {
                return done(err);
            });
        }
    )
)


// auth/naver

router.get('/', passport.authenticate('naver'));
router.get('/callback', passport.authenticate('naver', {
    session: false,
    failureRedirect: 'http://localhost:3000/login',
}), async (req, res) => {
    const token = await createJWT({id: req.user.id, provider: 'naver'});
    if(token) {
        res.cookie('sizelity_token',token);
    }
    res.redirect('http://localhost:3000');
    req.logout();
})

module.exports = router;