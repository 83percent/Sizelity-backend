var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
    mongoose.connect("mongodb://127.0.0.1:27017/");
    const db = mongoose.connection;
    db.on('error', console.error);  // mongoDB 연동 실패 시 에러 메시지 출력
    db.once('open', () =>{
        console.log('connected to mongoDB server'); // mongoDB 연동 성공 시 메시지 출력
    });

    res.type('application/json');
    res.send({
        "ucode" : "UAA00001",
        "id" : "hoonni2709@naver.com",
        "password" : "0SADF91820183%1&13%231FQ!@3qFEAFSFD!23AFasdf!asdf41Adsfa11111111",
        "name" : "서버",
        "reg_date" : "2021-02-04 18:42:00"
    });
});

module.exports = router;
