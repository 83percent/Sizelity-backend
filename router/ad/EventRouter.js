const express = require("express");
const router = express.Router();

// Module
const ADEvent = require("../../module/ad/ADEvent");
const NormalEvent = require("../../module/ad/NormalEvent");

// Field
const EVENT_TYPE = ['all', 'discount', 'free', 'coupon', 'saving', 'etc'];

/*
    Router Path : {this.server}/ad/event
*/

router.get('/promotion/:type', async (req, res) => {
    const type = req.params.type;
    const target = req.user.gender;
    if(!EVENT_TYPE.includes(type)) return res.status(400).send({error : '잘못된 요청입니다.'});
    const result = await ADEvent.getList({type, target});
    
    if(typeof result === 'object') return res.send(result);
    else return res.sendStatus(result);
});

router.get('/list/:type/:count', async (req, res) => {
    const {type, count} = req.params;
    const target = req.user.gender;

    if(!EVENT_TYPE.includes(type)) return res.status(400).send({error : '잘못된 요청입니다.'});

    const result = await NormalEvent.getList({type, count, target});
    
    if(typeof result === 'object') return res.send(result);
    else return res.sendStatus(result);
});


module.exports = router;