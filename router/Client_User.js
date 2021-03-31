const express = require('express');
const router = express.Router();

const UserProduct = require('./User/Product.js');
const UserAccount = require('./User/Account.js');
const UserAfter = require('./User/After');
const responseCode = require('../lib/response-code/response-code.js');


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
    else {
        console.log("삭제하려는 Client id : ", req.user._id);
        console.log("삭제하려는 상품 id : ", req.params.deleteID);
        const result = await UserProduct.remove(req.user._id, req.params.deleteID);
        res.send(result);
    }
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

router.delete('/after:deleteID', async (req, res) => {
    const removeID = req.params.removeID;
    if(!removeID) res.status(403).send({message : "Invalid Request"});
    else {
        const result = await UserAfter.remove(req.user._id, removeID);
        response.send(result);
    }
    
}); // DELETE



/* ================================ 
            Account
================================ */
router.post('/signup', async (request, response) => {
    const result = await UserAccount.set(request);
    response.send(result);
});
router.get('/logout', async (req, res) => {
    console.log("로그아웃");
    req.logout();
    res.send({status:200});
});
router.patch('/', async (req, res) => {
    const data = req.body;
    console.log(data);
    if(data.type !== undefined) {
        const result = await UserAccount.updata(req.user, data);
        res.send(result);
    } else res.send(responseCode.invalid);
});
router.delete('/', async (req, res) => {
    
}); // DELETE 삭제
router.put('/', async (req, res) => {

});


module.exports = router;
