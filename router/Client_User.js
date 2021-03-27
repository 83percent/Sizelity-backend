const express = require('express');
const router = express.Router();
const ResponseCode = require('../lib/response-code/response-code');
const session = require('express-session');
session({
    secret: 'rererere',
    resave: false,
    saveUninitialized : false,
    cookie: {
        secure: false
    }
});

const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const UserModel = require("../models/UserModel");
const bcrypt = require('bcrypt');

const UserProduct = require('./User/Product.js');
const UserAccount = require('./User/Account.js');
const UserAfter = require('./User/After');

// Account
// Create User
router.post('/signup', async (request, response) => {
    const result = await UserAccount.set(request);
    response.send(result);
});


/* ================================ 
            User Product
================================ */
router.get('/product', async (req, res) => {
    console.log(req.user);
    const result = await UserProduct.get(req.user._id);
    res.status(200).send(result);
}); // Get

router.post('/product', async (req, res) => {
    const result = await UserProduct.set(req.user._id, req.body);
    res.status(200).send(result);
}); // Set


router.delete('/product/:deleteID', async (req, res) => {
    if(!req.params.deleteID) res.status(403).send({message : "Invalid Request"});
    console.log("삭제하려는 Client id : ", req.user._id);
    console.log("삭제하려는 상품 id : ", req.params.deleteID);
    const result = await UserProduct.remove(req.user._id, req.params.deleteID);
    res.send(result);
}); // DELETE

router.put('/product', (request, response) => {
    
}); // PUT : Update User Product


/* ================================ 
        After View Product
================================ */ 
router.get('/after', async (req, res) => {
    console.log("GET : /after 요청 아이디 : ", req.user)
    const result = await UserAfter.get(req.user.id);
    res.send(result);
}); // Get

router.post('/after', async (req, res) => {
    console.log("로그인 여부 : ", req.isAuthenticated());
    console.log("로그인 정보 : ", req.user._id);
    const result = await UserAfter.set(req.user._id, req.body);
    console.log("결과 값", result);
    res.send(result);
}); // Set : Create

router.delete('/after', (request, response) => {
    console.log("삭제할 데이터 : ",request.body);
    ( async () => {
        const result = await UserAfter.remove(request);
        console.log("REMOVE User After Product Data : ", result);
        response.send(result);
    })();
}); // DELETE



/* ================================ 
            Account
================================ */
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
router.get('/logout', (req, res) => {
    console.log("로그아웃");
    req.logout();
    res.send({status:200});

    //res.redirect('/');
    /* req.session.save(function(){
        res.redirect('/');
    }); */
});
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
