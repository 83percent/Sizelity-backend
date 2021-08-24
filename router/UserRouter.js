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
router.get('/product/:id', async (req, res) => {
    if(!req.isAuthenticated() || req.user.id !== req.params.id) {
        res.sendStatus(StatusCode.auth);
    }
    const result = await UserProduct.get(req.user._id);
    switch(typeof result) {
        case 'object' : {
            res.send(result);
            break;
        }
        case 'number' : {
            res.sendStatus(result);
            break;
        }
        default : {
            res.sendStatus(500);
        }
    }
}); // Get

router.post('/product', async (req, res) => {
    const result = await UserProduct.set(req.user, req.body);
    res.status(200).send(result);
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
router.get('/logout', async (req, res) => {
    //console.log("로그아웃");
    req.logout();
    res.send({status:200});
});
router.patch('/', async (req, res) => {
    const data = req.body;
    //console.log(data);
    if(data.type !== undefined) {
        const result = await UserAccount.updata(req.user, data);
        res.send(result);
    } else res.send(StatusCode.invalid);
});

/*
    2021-08-10 (이재훈)
*/
router.delete('/', async (req, res) => {
    const {password, option, suggest} = req.body;
    const result = await UserAccount.remove(req.user._id, password, option, suggest);
    switch(result){
        case 200 : {
            req.logout();
            res.sendStatus(200);
            break;
        }
        case 400 : {
            res.status(result).send({error : "잘못된 접근입니다."});
            break;
        }
        case 403 : {
            res.status(result).send({error : "비밀번호가 일치하지 않습니다."});
            break;
        }
        case 500 :
        default : {
            res.status(500).send({error : "문제가 발생했습니다."});
            break;
        }
    }
    
}); // DELETE 삭제

module.exports = router;
