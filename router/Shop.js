const { response } = require('express');
const express = require('express');
const router = express.Router();
const ShopModel = require('../models/ShopModel');

const Response_invalid = {status : -404};
const Response_error = {status : -200};
const Response_privacy = {status : 301};
const Response_already = {status : 0};

// Create Shop
router.post("/create", async (request,response) => {
    const data = request.body;
    try {
        if(data.info && data.url) {
            const exist = await ShopModel.find({"info.name" : data.info.name, "url.domain": data.url.domain});
            if(exist) {
                const shop = new ShopModel(data);
                shop.save((err,result) => {
                    if(err) throw new Error;
                    console.log(result);
                    response.send(result);
                });
            } else {
                response.send(Response_already);
            }
        } else {
            response.send(Response_invalid);
            return;
        }
    } catch(error) {
        console.error(error);
        response.send(Response_error);
    }
})
// Read
router.post("/get", (request,response) => {
    const data = request.body;
    try {
        if(data.url && data.url.domain) {
            ShopModel.find({"url.domain": data.url.domain}, (err,result) => {
                if(err) throw new Error;
                response.send(result);
            })
        } else {
            response.send(Response_invalid);
            return;
        }
    } catch(error) {
        console.error(error);
        response.send(Response_error);
    }
});


module.exports = router;
