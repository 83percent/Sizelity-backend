const express = require('express');
const router = express.Router();

const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const UserModel = require("../models/UserModel");
const bcrypt = require('bcrypt');

router.post('/', passport.authenticate('local'), 
    function(req, res) {
        if(req.user) {
            res.send({
                _id: req.user.id,
                uid: req.user.uid,
                password: req.user.upwd,
                name: req.user.name
            });
        } else {
            res.send({status:404})
        }
    }
);


passport.use(new LocalStrategy (
    function(username, password, done) {
        console.log("로그인 시도");
        console.log(username);
        console.log(password);
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
    console.log("serialize");
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => {
        console.log("deserialize");
        done(err, user);
    })
});


module.exports = router;