const express = require('express');
const router = express.Router();

const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const UserModel = require("../models/UserModel");
const bcrypt = require('bcrypt');

const StatusCode = require("../lib/response-code/status-code");
const ResponseCode = require("../lib/response-code/response-code");
const saltRounds = 10;


// Create User
router.post('/signup', async (req, res) => {
    const data = req.body;
    if(!data.uid || !data.upwd || !data.name || !data.gender) res.send(ResponseCode.invalid);
    try {
        const user = await UserModel.findOne({uid: data.uid});
        if(user?._id) res.send(ResponseCode.already);
        else {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(data.upwd, salt);
            if(hash) {
                const account = new UserModel({
                    uid : data.uid,
                    upwd : hash,
                    name : data.name,
                    gender : data.gender,
                    privacy : data.privacy,
                    alert : data.alert
                }); 
                const result = await account.save();
                if(result._id) res.send(ResponseCode.success);
                else res.send(ResponseCode.error);
            } else {
                res.send(ResponseCode.error);
            }
        }
    } catch{res.send(ResponseCode.error)}
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
            res.sendStatus(StatusCode.noData);
        }
    }
);


passport.use(new LocalStrategy (
    function(username, password, done) {
        console.table([username, password]);
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