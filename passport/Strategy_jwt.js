const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Strategy:JwtStrategy } = require('passport-jwt');


// Config
const path = require('path');
const ENV_PATH = path.resolve(__dirname, "../.env");
require('dotenv').config({path : ENV_PATH});


// Model
const UserModel = require("../models/UserModel");

const CookieExtractor = function(req) {
    let token = null;
    if(req && req.cookies) token = req.cookies['sizelity_token'];
    return token;
}

const options = {
    jwtFromRequest : CookieExtractor,
    secretOrKey : process.env.JWT_SECRET_KEY,
    issuer : 'account.sizelity.com',
    audience: 'sizelity.com',
}

passport.use(new JwtStrategy(options, async (payload, done) => {
    //console.log("읽어온 'payload' : ",payload);
    const {id, provider} = payload;
    await UserModel.findOne({_id : id, provider}, function(err, user) {
        if(err) return done(err, false);
        if(user) return done(null, user);
        else return done(null, false);
    })
}));

router.post('/', passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        res.send({_id : req.user.id, name : req.user.name, gender : req.user.gender});
    }
)

module.exports = router;