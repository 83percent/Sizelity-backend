const express = require('express');
const router = express.Router();
const status_code = require('../lib/response-code/status-code');
const Product = require('../module/product/Product.js');

/*
    - shop, code 로 상품을 검색

    body : {
        full : 요청한 상품 정보를 저장하기 위해 필요
    }

    HTTP STATUS CODE
    200 : success
    401 : invalid
    404 : no data
    500 : error
*/
router.post('/:shop_domain/:code', async (req, res) => {
    const shop = req.params.shop_domain;
    const code = req.params.code;
    const full = req.body?.full;
    if(!shop || !code) res.sendStatus(status_code.invalid);
    else {
        const result = await Product.getProduct(shop,code);
        if(result?._id) res.status(status_code.success).send(result);
        else {
            switch(result) {
                case null : {
                    if(full) await Product.setEmptyProduct(shop, code, full);
                    res.sendStatus(status_code.noData);
                    break;
                }
                case 'error' :
                default : {
                    res.sendStatus(status_code.error);
                }
            }
        }
    }
});
/*
    - id로 상품을 검색
    HTTP STATUS CODE
    200 : success
    401 : invalid
    404 : no data
    500 : error
*/
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    if(id.length < 16) return res.sendStatus(status_code.invalid);
    else {
        const result = await Product.getProductFindById(id);
        if(result?._id) res.status(status_code.success).send(result);
        else {
            switch(result) {
                case null : {
                    res.sendStatus(status_code.noData);
                    break;
                }
                case 'error' :
                default : {
                    res.sendStatus(status_code.error);
                }
            }
        }
    }
});

module.exports = router;