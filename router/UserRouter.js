const express = require('express');
const router = express.Router();

const UserProduct = require('../module/user/UserProduct.js');
const UserAccount = require('../module/user/UserAccount.js');
const UserAfter = require('../module/user/UserAfter');

const StatusCode = require('../lib/response-code/status-code.js');


/* 
    User Product
    마지막 수정 : 2021-08-08 이재훈
        
*/
router.get('/product', async (req, res) => {
    try {
        return res.send(req.user?.product);        
    } catch {
        return res.status(500).send({error : '서버에 문제가 발생했어요'});
    }
    
}); // Get

router.post('/product', async (req, res) => {
    const result = await UserProduct.set(req.user, req.body);
    switch(result) {
        case 200 : return res.sendStatus(result);
        case 202 : return res.status(result).send({error : '옷장이 가득 찼어요'});
        case 419 : return res.status(result).send({error : '이미 옷장에 있어요'});
        case 500 :
        default : return res.status(500).send({error : '서버에 문제가 발생했어요'});
    }
}); // Set  


router.delete('/product/:id/:productID', async (req, res) => {
    const { id, productID } = req.params;
    if(!req.isAuthenticated() || req.user.id !== id) {
        res.sendStatus(StatusCode.auth);
    }
    const result = await UserProduct.remove(id, productID);
    res.sendStatus(result);
}); // DELETE

router.put('/product', async (req, res) => {
    const result = await UserProduct.update(req.user, req.body);
    res.status(200).send(result);
}); // PUT : Update User Product




/* ================================ 
            Account
================================ */
router.get('/', async (req, res) => {
    if(req.user) {
        const {provider, gender} = req.user;
        return res.send({provider, gender})
    } else {
        return res.status(StatusCode.error);
    }
})
router.get('/logout', async (req, res) => {
    //console.log("로그아웃");
    req.logout();
    res.send({status:200});
});

router.patch('/', async (req, res) => {
    const data = req.body;
    const result = await UserAccount.update(req.user.id, data);
    switch(result) {
        case 200 : {
            return res.sendStatus(StatusCode.success);
        }
        case 500 :
        default : {
            return res.status(500).send({error : "서버에 문제가 발생했습니다."});
        }
    }
});

/*
    2021-08-28 (이재훈)
*/
router.delete('/', async (req, res) => {
    const {reason} = req.body;
    const result = await UserAccount.remove(req.user._id, reason);
    switch(result){
        case 200 : {
            req.logout();
            res.sendStatus(StatusCode.success);
            break;
        }
        case 500 :
        default : {
            res.status(StatusCode.error).send({error : "문제가 발생했습니다."});
            break;
        }
    }
    
}); // DELETE 삭제

module.exports = router;
