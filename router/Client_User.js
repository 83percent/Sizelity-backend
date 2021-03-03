const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');


const Response_error = {status : -200};
const Response_invalid = {status : -404};
const Response_noData = {status : 404};
const Response_already = {status : 0};



router.post('/signin', (request, response) => {
    const data = request.body;

    console.log("Try Client Login : ", data);

    let query = null;
    if(data._id && data.upwd) {
        query = {"_id" : data._id, "upwd":data.upwd};
    } else if(data.uid && data.upwd) {
        query = {"uid": data.uid, "upwd" : data.upwd};
    } else {
        response.send(Response_invalid);
        return;
    }
    UserModel.findOne(query, (err, result) => {
        console.log("Try Client Login FIND DATA : ", result);
        if(err) {
            response.send(Response_error);
            return;
        } else {
            console.log("RESULT",result);
            if(result && result._id) {
                response.send(result);
            } else {
                response.send(Response_noData);
            }
        }
    });

})

// Temp Create
router.post('/signup', (request, response) => {
    const data = request.body;
    try {
        UserModel.findOne({"uid": data.uid}, (err, result) => {
            if(err) {
                response.send(Response_error);
                return;
            }
            else {
                if(result) response.send(Response_already);
                else {
                    const user = new UserModel(data);
                    user.save((err, result) => {
                        if(err) {
                            response.send(Response_error);
                            return;
                        }
                        else {
                            response.send({status : 200});
                        }
                    });
                }
            }
        });
    } catch {
        response.send(Response_error);
    }
    
});
module.exports = router;
