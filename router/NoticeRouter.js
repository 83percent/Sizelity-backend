const express = require("express");
const router = express.Router();

const Notice = require("../module/notice/Notice");

router.get('/', async (req, res) => {
    const result = await Notice.get();
    if(typeof result == 'object') {
        return res.send(result);
    } else {
        switch(result) {
            case 500 :
            default : {
                res.status(500).send({error : "서버에 문제가 발생했습니다."});
            }
        }
    }
});

module.exports = router;