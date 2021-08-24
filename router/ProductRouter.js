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
    console.log(req.body)
    if(!domain || !code) res.sendStatus(StatusCode.invalid);
    else {
        const result = await ProductModule.get({domain, code, full});
        if(typeof result !== 'number') res.send(result);
        else res.sendStatus(result);
    }
});

/*
    2021-08-04 (이재훈)
    GET : /product
    _id를 이용하여 상품 불러오기
*/
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if(id?.length > 10) res.sendStatus(StatusCode.invalid);
    else {
        const result = ProductModule.get({id});
        if(typeof result !== 'number') res.send(result);
        else res.sendStatus(result);
    }
    
});

module.exports = router;