/*
    2021-08-23
    카카오 로그인 구현
    Passport 전략 : 카카오
*/
const path = require('path');
const ENV_PATH = path.resolve(__dirname, "../.env");
require('dotenv').config({path : ENV_PATH});

const passport = require('passport-kakao');
const KakaoStrategy = passport.Strategy;
const UserModel = require('../models/UserModel');
const { db } = require('../models/UserModel');

console.log(process.env.KAKAO_CLIENT_ID);

passport.use(
    new KakaoStrategy(
        {
            ClientID : process.env.KAKAO_CLIENT_ID,
            ClientSecret: "",
            callbackURL : 'http://localhost:3001/oauth'
        }
    ),
    // CALL BACK
    async (_,__, profile, done) => {
        const {
            id,
            username: name,
            _json: {
                properties : {
                    profile_nickname,
                    gender
                },
                kakao_account: { email },
            }
        } = profile;
        try {

        } catch(error) {
            return done(error)
        }
    }
)