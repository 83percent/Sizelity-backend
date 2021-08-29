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
        case 500 :
        default : {
            res.status(result).send({error : "문제가 발생했습니다."});
        }
    }
});

router.delete("/", async (req, res) => {
    const result = await AfterProduct.remove(req.user.id, req.body.productID);
    res.sendStatus(result);
});

module.exports = router;