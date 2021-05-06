const express = require('express');
const router = express.Router();

const UserProduct = require('../module/user/Product.js');
const UserAccount = require('../module/user/Account.js');
const UserAfter = require('../module/user/After');

const StatusCode = require('../lib/response-code/status-code.js');
const responseCode = require('../lib/response-code/response-code.js');


/* ================================ 
            User Product
================================ */
router.get('/product', async (req, res) => {
    //console.log(req.user);
    const result = await UserProduct.get(req.user._id);
    res.status(200).send(result);
}); // Get

router.post('/product', async (req, res) => {
    const result = await UserProduct.set(req.user, req.body);
    res.status(200).send(result);
}); // Set  


router.delete('/product/:deleteID', async (req, res) => {
    if(!req.params.deleteID) res.status(403).send({message : "Invalid Request"});
    else {
        //console.log("삭제하려는 Client id : ", req.user._id);
        //console.log("삭제하려는 상품 id : ", req.params.deleteID);
        const result = await UserProduct.remove(req.user._id, req.params.deleteID);
        res.send(result);
    }
}); // DELETE

router.put('/product', async (req, res) => {
    const result = await UserProduct.update(req.user, req.body);
    res.status(200).send(result);
}); // PUT : Update User Product


/* ================================ 
        After View Product
        50개 까지만 저장
================================ */ 
router.get('/after', async (req, res) => {
    const result = await UserAfter.get(req.user.id);
    if(result == null) res.send(StatusCode.unauthorized);
    else res.status(StatusCode.success).send(result);
}); // Get

router.post('/after', async (req, res) => {
    const result = await UserAfter.set(req.user._id, req.body);
    switch(result) {
        case true : {
            res.sendStatus(StatusCode.success);
            break;
        }
        case null : {
            res.sendStatus(StatusCode.maximum);
            break;
        }
        case false :
        default : {
            res.sendStatus(StatusCode.error);
        }
    }
}); // Set : Create

router.delete('/after', async (req, res) => {
    const removeIDs = req.body.products;
    if(!removeIDs) res.sendStatus(StatusCode.error);
    else if(removeIDs.length > 0) {
        const result = await UserAfter.remove(req.user._id, removeIDs);
        switch(result) {
            case true : {
                res.sendStatus(StatusCode.success);
                break;
            }
            case null : {
                res.sendStatus(StatusCode.unauthorized);
                break;
            }
            case false :
            default : {
                res.sendStatus(StatusCode.error);
            }
        }
        
    } else res.sendStatus(StatusCode.success);
    
    
}); // DELETE



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
    } else res.send(responseCode.invalid);
});
router.delete('/', async (req, res) => {
    const {password, option, suggest} = req.body;
    const result = await UserAccount.remove(req.user._id, password, option, suggest);
    switch(result){
        case 1 : {
            res.sendStatus(StatusCode.success);
            break;
        }
        case 0 : {
            res.sendStatus(StatusCode.noData)
            break;
        }
        case -1 : {
            res.sendStatus(StatusCode.invalid)
            break;
        }
        case -2 :
        default : {
            res.sendStatus(StatusCode.error)
            break;
        }
    }
    
}); // DELETE 삭제

module.exports = router;
