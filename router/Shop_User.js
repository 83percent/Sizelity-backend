const express = require('express');
const router = express.Router();
const ShopUserModel = require('../models/ShopUserModel');
const ShopModel = require('../models/ShopModel');

const Response_invalid = {status : -404};
const Response_error = {status : -200};
const Response_privacy = {status : 301};
const Response_noShop = {status : -405};
const Response_already = {status : 0};
// Create
router.post("/signup", (request, response) => {
    const data = request.body;
    try {
        if(data.domain) {
            console.log(data.domain);
            ShopModel.findOne({"url.domain" : data.domain}, (err, result) => {
                if(err) new Error("Exist");
                if(result._id) {
                    data.shop_id = result._id;
                    const user = new ShopUserModel(data);
                    user.save((err, result) => {
                        if(err) new Error("Error");
                        if(result) {
                            response.send(result);
                        } else {
                            response.send(Response_already);
                        }
                    });
                } else {
                    response.send(Response_noShop); 
                }
            })
        } else {
            response.send(Response_invalid);
        }
    } catch(err) {
        response.send(Response_error);
    }
    
});

const check = (data, reponse) => {
    if(data.privacy) {
        reponse.send(Response_privacy);
        return false;
    }
}


module.exports = router;