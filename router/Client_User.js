const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

const UserProduct = require('./User/Product.js');
const UserAccount = require('./User/Account.js');

const Response_error = {status : -200};
const Response_invalid = {status : -404};
const Response_noData = {status : 404};
const Response_already = {status : 0};



// Login
router.post('/signin', async (request, response) => {

    const result = await UserAccount.get(request);
    console.log(result);
    response.send(result);
})

// Join
router.post('/signup', async (request, response) => {
    console.log(request.bdoy);
    const result = await UserAccount.set(request);
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
        const result = await UserProduct.set(request);
        console.log("ADD User Product : ", result);
        response.send(result);
    })();
});
module.exports = router;
