/*
    2021-08-04 
    작성자 : 이재훈
*/

const express = require('express');
const router = express.Router();
const StatusCode = require('../lib/response-code/status-code');
const ProductModule = require('../module/product/Product.js');

/*
    2021-08-04 (이재훈)
    POST : /product/search
    domain + code 로 검색 (full 은 저장을 위해)
*/
router.post('/search', async (req, res) => {
    const { domain, code, full } = req.body;

    //console.log(`상품 정보 요청 "domain : ${domain}, code : ${code}, full : ${full}`);

    if(!domain || !code) return res.status(StatusCode.invalid).send({error : '잘못된 접근입니다.'}) // 400
    else {
        const result = await ProductModule.get({domain, code, full});
        if(typeof result !== 'number') res.send(result);
        else {
            switch(result) {
                case 204 : return res.sendStatus(result);
                case 500 :
                default : return res.status(500).send({error : '서버에 문제가 발생했어요'});
            }
        }
    }
});

/*
    2021-08-04 (이재훈)
    GET : /product/:id
    _id를 이용하여 상품 불러오기
*/
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if(id?.length < 10) return res.status(StatusCode.invalid).send({error : "잘못된 접근입니다."}) // 400
    else {
        const result = ProductModule.get({id});
        if(typeof result !== 'number') res.send(result);
        else {
            switch(result) {
                case 204 : return res.sendStatus(result);
                case 500 :
                default : return res.status(500).send({error : "서버에 문제가 발생했어요"});
            }
        }
    }
    
});

module.exports = router;