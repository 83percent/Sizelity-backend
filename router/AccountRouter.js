const express = require('express');
const router = express.Router();

const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcrypt');

// Model
const UserModel = require("../models/UserModel");
const UserAfterProductModel = require("../models/UserAfterProductModel");

const StatusCode = require("../lib/response-code/status-code");
const saltRounds = 10;


// Create User
router.post('/signup', async (req, res) => {
    const {uid, upwd, name, gender, terms, alert} = req.body;
    if(!uid || !upwd || !name || !gender) res.sendStatus(StatusCode.invalid); //400
    try {
        const user = await UserModel.findOne({uid: uid});
        if(user?._id) res.sendStatus(StatusCode.already); // 419
        else {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(upwd, salt);
            if(hash) {
                const account = new UserModel({
                    uid,
                    upwd : hash,
                    name,
                    gender,
                    terms,
                    alert
                }); 
                const result = await account.save();
                if(result._id) {
                    try {
                        // 에프터 모델에 정보 추가
                        let _userAftere = new UserAfterProductModel({
                            _id : result._id
                        });
                        _userAftere = _userAftere.save();
                        console.log(_userAftere);
                    } catch (err){console.log(err);}
                    res.sendStatus(StatusCode.success); // 200
                }
                else res.sendStatus(StatusCode.error); // 500
            } else {
                res.sendStatus(StatusCode.error); // 500
            }
        }
    } catch(err) {
        console.log(err);
        res.sendStatus(StatusCode.error); // 500
    }
})

// Login User
router.post('/signin', passport.authenticate('local'), 
    function(req, res) {
        if(req.user) {
            res.send({
                _id: req.user.id,
                uid: req.user.uid,
                password: req.user.upwd,
                name: req.user.name
            });
        } else {
            res.sendStatus(StatusCode.noData); // 204
        }
    }
);


passport.use(new LocalStrategy (
    function(username, password, done) {
        UserModel.findOne({uid: username}, (err, user) => {
           if(err) return done(err);
           if(!user) return done(null, false, {message: 'Incorrect id'});
           try {
               const match = password.length > 20 
                    ? password === user.upwd
                    : bcrypt.compareSync(password, user.upwd);
               if(match) {
                   return done(null, user);
               } else {
                   return done(null, false, {message: 'Incorrect password'});
               }
           } catch(e) {
               return done(e);
           }    
       });
   }
));

passport.serializeUser((user, done) => {
    //console.log("serialize");
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => {
        //console.log("deserialize");
        done(err, user);
    })
});


module.exports = router;