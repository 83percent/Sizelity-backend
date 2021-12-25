/*
    2021-08-23
    카카오 로그인 구현
    Passport 전략 : 카카오
*/

const express = require('express');
const router = express.Router();

// JWT
const { createJWT } = require('./JWT');

const path = require('path');
const ENV_PATH = path.resolve(__dirname, "../.env");
require('dotenv').config({path : ENV_PATH});

const passport = require("passport");
const KakaoStrategy = require('passport-kakao').Strategy;
const { create } = require('./Create_User');

passport.use(
    new KakaoStrategy(
        {
            clientID : "ced3569154a58ffeff21de9254c5c836",
            clientSecret : "",
            callbackURL : 'http://192.168.11.2:3001/auth/kakao/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            const {
                _json : {
                    id,
                    properties: { nickname },
                    kakao_account : {
                        gender
                    }
                }
            } = profile;
            create({
                uid : id,
                name : nickname,
                gender,
                provider : 'kakao'
            }).then(user => {
                return done(null, user);
            }).catch(err => {
                return done(err);
            });
        }
    )
)



// auth/kakao
router.get('/', passport.authenticate('kakao'));

router.get('/callback', passport.authenticate('kakao', {
    session: false,
    failureRedirect: "http://192.168.11.2:3000",
}), async (req, res) => {
    const token = await createJWT({id: req.user.id, provider: 'kakao'});
    if(token) {
        //res.cookie('sizelity_token',token);
        res.redirect(`http://192.168.11.2:3000/login/auth?valid=${token}`);
    } else {
        res.redirect("http://192.168.11.2:3000/login/auth");
    }
    req.logout();
});

module.exports = router;