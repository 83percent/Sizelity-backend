const express = require('express');
const router = express.Router();

const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const UserModel = require("../models/UserModel");
const bcrypt = require('bcrypt');

const UserProduct = require('./User/Product.js');
const UserAccount = require('./User/Account.js');
const UserAfter = require('./User/After');

// Account
// Login
router.post('/signin', async (request, response) => {

    console.log("로그인 요청 데이터 : ", request.cookies);  
    const result = await UserAccount.get(request);
    console.log("로그인 시도 결과 : ", result);
    response.header("Access-Control-Allow-Origin", "*");
    response.send(result);
})



// Create User
router.post('/signup', async (request, response) => {
    const result = await UserAccount.set(request);
    response.send(result);
});

router.post('/signout', async (request, reponse) => {
    request.logout();
});

// User Request MyProduct Data
router.post('/getproduct',(request, response) => {
    ( async () => {
        const result = await UserProduct.get(request);
        console.log("User Fav Product Result is : ", result);
        response.send(result);
    })();    
});

router.post('/setproduct',(request, response) => {
    ( async () => {
        console.log("나의 상품 추가 요청 데이터 : ", request.body);
        const result = await UserProduct.set(request);
        console.log("ADD User Product : ", result);
        response.send(result);
    })();
});
router.post('/removeproduct', (request, response) => {
    ( async () => {
        console.log("나의 상품 삭제 요청 데이터 : ", request.body);
        const result = await UserProduct.remove(request);
        console.log("삭제결과 : ", result);
        response.send(result);
    })();
});
router.post('/updateproduct', (request, response) => {
    
});


// After Product 
router.post('/getafter', (request, response) => {
    ( async () => {
        const result = await UserAfter.get(request);
        console.log("GET User After Product Data : ", result);
        response.send(result);
    })();
});
router.post('/setafter', (request, response) => {
    console.log(request.body);
    ( async () => {
        const result = await UserAfter.set(request);
        console.log("Set User After Product Data : ", result);
        response.send(result);
    })();
});
router.post('/removeafter', (request, response) => {
    console.log("삭제할 데이터 : ",request.body);

    ( async () => {
        const result = await UserAfter.remove(request);
        console.log("REMOVE User After Product Data : ", result);
        response.send(result);
    })();
});

router.post('/', passport.authenticate('local'), 
    function(req, res) {
        console.log("passpord Info : ", req.user);
        if(req.user) {
            console.log("로그인 확인.", req.user);
            res.send({
                _id: req.user.id,
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
                const match = bcrypt.compareSync(password, user.upwd);
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
    done(null, user.id)
});
passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => {
        console.log("deserialize");
        done(err, user);
    })
});

module.exports = router;
