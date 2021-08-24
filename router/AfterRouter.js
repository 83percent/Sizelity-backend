const express = require('express');
const router = express.Router();
const AfterProduct = require("../module/user/UserAfter");

router.get('/', async (req, res) => {
    const result = await AfterProduct.get(req.user.id);
    switch(typeof result) {
        case 'object' : {
            return res.send(result);
        }
        case 'number' : {
            switch(result) {
                case 401 : {
                    res.status(result).send({error : "로그인 후 이용가능 합니다."});
                }
                case 500 : 
                default : {
                    res.status(result).send({error : "문제가 발생했습니다."});
                    break;
                }
            }
            break;
        }
        default : {
            res.status(result).send({error : "문제가 발생했습니다."});
            break;
        }
    }
});

/*
    2021-08-10 (이재훈)
*/
router.post("/", async (req, res) => {
    const result = await AfterProduct.set(req.user.id, req.body.productID);
    switch(result) {
        case 200 : {
            res.sendStatus(result);
            break;
        }
        case 202 : {
            res.status(result).send({error : "나중에 볼 상품이 너무 많아요.(최대 100개)"});
            break;
        }
        case 401 : {
            res.status(result).send({error : "로그인 후 이용가능 합니다."});
            break;
        }
        case 419 : {
            res.status(result).send({error : "이미 저정된 상품입니다."});
            break;
        }
        case 500 : {
            res.status(result).send({error : "문제가 발생했습니다."});
        }
    }
    
});

router.delete("/", async (req, res) => {
    const result = await AfterProduct.remove(req.user.id, req.body.productID);
    res.sendStatus(result);
});

module.exports = router;