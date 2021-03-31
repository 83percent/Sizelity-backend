const express = require('express');
const router = express.Router();
const ProductModel = require('../models/ProductModel');
const ResponseCode = require('../lib/response-code/response-code');


// 상품 정보 불러오기 ! 회원가입 필요없음
router.get('/:shop_domain/:code', async (req, res) => {
    const shop = req.params.shop_domain;
    const code = req.params.code;
    console.log("검색하려는 REST shop : ", shop)
    console.log("검색하려는 REST code : ", code)
    const product = await ProductModel.findOne({"praw.domain": shop, "praw.code":code}, (err) => {
        if(err) return ResponseCode.error;
    });
    console.log(product);
    if(product === null) res.send(ResponseCode.noData);
    else res.send(product);
});
// Shop이 자신의 상품 목록을 불러오는데 필요한 전체 목록 불러오기 기능.
router.get('/:shop_domain', async (req, res) => {
    if(req.isAuthenticated()) {
        if(!req.user.praw) return res.status(401).send({message: "Can't access user"});
        const {domain:authDomain} = req.user.praw; // passport 추출 정보 (Shop_User로 로그인 해야지만 가져올 수 있음)
        const shop = req.params.shop_domain;
        
        if(shop !== authDomain) res.status(401).send({message: "Can't access user"});
        else {
            try {
                const product = await ProductModel.find({"praw.domain": shop}, (err) => {
                    if(err) return null;
                });
                if(product === null) res.send(ResponseCode.error);
                else res.send(product);
            } catch {res.send(ResponseCode.error)}

        }
    } else res.status(401).send({message: "Can't access user"});
});

// 상품 추가
router.post('/', async (req, res) => {
    // passport -> shop_user에서 찾아오기
    if(req.isAuthenticated()) {
        try {
            const data = req.body;
            const {sname:authSname, domain:authDomain} = req.user.praw;
            const {sname, domain, code} = data.praw;

            if(sname !== authSname || domain !== authDomain) res.status(401).send({message: "Invalid Request"});
            else {
                // 중복확인
                const isProduct = await ProductModel.findOne({"praw.domain": domain, "praw.code": code});
                if(!isProduct) res.send({status: ResponseCode.already});
                else {
                    const product = new ProductModel(data);
                    const result = await product.save(err);
                    if(!result) res.send(ResponseCode.success);
                    else res.send(ResponseCode.error);
                }
            }
        } catch {res.send(ResponseCode.error)}
        
    } else req.status(401).send({message: "Can't access user"});
});
// @params id : ProductModel._id
router.delete('/:id', async (req, res) => {
    if(req.isAuthenticated()) {
        const product = await ProductModel.findByIdAndDelete(req.params.id);
        if(product) res.send(ResponseCode.success);
        else res.send(ResponseCode.noData);
    } else req.status(401).send({message: "Can't access user"});
});

// Update
// Update Data Only One
// Product Size or code
router.put('/update', async (request, response) => {
    
});
/*
    {
        ..
        update : {
            "TODO"
        }
    }
*/
// Update Data Many : ex) sname Change or praw(expect code)

// Model.find( <query > ) => return [ <Object> ];

module.exports = router;