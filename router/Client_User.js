const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');


const Response_error = {status : -200};
const Response_invalid = {status : -404};
const Response_noData = {status : 404};
const Response_already = {status : 0};



router.post('/signin', (request, response) => {
    const data = request.body;
    let query = null;
    if(data._id && data.upwd) {
        query = {"_id" : data._id, "upwd":data.upwd};
    } else {
        if(data.uid && data.upwd) query = {"uid": data.uid, "upwd" : data.upwd};
    }
    if(query === null) {
        response.send(Response_invalid);
        return;
    }
    UserModel.find(query, (err, result) => {
        if(err) {
            response.send(Response_error);
            return;
        } else {
            console.log("RESULT",result);
            const count = result.length
            if(count < 0) {
                response.send(Response_error);
            }  else {
                switch(count) {
                    case 0 : {
                        response.send(Response_noData);
                        break;
                    }
                    case 1 : {
                        response.send(result[0]);
                        break;
                    }
                    default : {
                        break;
                    }
                }
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
