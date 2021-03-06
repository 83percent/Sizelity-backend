const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

const UserProduct = require('./User/Product.js');
const UserAccount = require('./User/Account.js');

const Response_error = {status : -200};
const Response_invalid = {status : -404};
const Response_noData = {status : 404};
const Response_already = {status : 0};


// Account
// Login
router.post('/signin', async (request, response) => {
    const result = await UserAccount.get(request);
    console.log(result);
    response.send(result);
})

// Create User
router.post('/signup', async (request, response) => {
    console.log("요청 데이터 : ", request.body)
    const result = await UserAccount.set(request);
    response.send(result);
});

router.post('remove', async (request, reponse) => {
    
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
