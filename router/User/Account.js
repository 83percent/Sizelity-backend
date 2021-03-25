const UserModel = require("../../models/UserModel");
const ResponseCode = require("../../lib/response-code/response-code");
const bcrypt = require('bcrypt');
const { response } = require("express");
const saltRounds = 10;

const get = async (request) => {
    try {
        const data = request.body;
        let findQuery = null;
        if(data._id && data.upwd) {
            findQuery = {"_id":data._id, "upwd":data.upwd};
        } else if(data.uid && data.upwd) {
            findQuery = {"uid":data.uid, "upwd":data.upwd};
        } else {
            return ResponseCode.invalid;
        }
        const result = await UserModel.findOne(findQuery);

        if(result && result._id && result.upwd &&result.name) {
            return {
                _id : result._id,
                name : result.name,
                upwd : result.upwd
            }
        } else {
            return ResponseCode.noData;
        }
    } catch(error) {
        console.log(error);
        return ResponseCode.error;
    }
}

// Create Account
/*
{
    uid : String*
    upwd :  String*
    name : String*
    gender : String*
    privacy : Boolean*
    alert : Boolean
}
*/
const set = async (request) => {
    const data = request.body;
    if(!data.uid || !data.upwd || !data.name || !data.gender) return ResponseCode.invalid;
    const user = await UserModel.findOne({uid: data.uid}, (err, user) => {
        if(err) return false;
        return user;
    });
    if(user === false) return ResponseCode.error;
    else if(user !== null) return ResponseCode.already;
    else {
        try {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(data.upwd, salt);
            if(hash) {
                const account = new UserModel({
                    uid : data.uid,
                    upwd : hash,
                    name : data.name,
                    gender : data.gender,
                    privacy : data.privacy,
                    alert : data.alert
                }); 
                const result = await account.save();
                if(result._id) {
                    return {status : 200};
                } else return ResponseCode.error;
            }
        } catch {return ResponseCode.error}
    }
}

// Remove Account


// Updata Account
/*
    {
        _id
        upwd 
    }
*/
const update = async (request) => {
    const data = request.body;
    if(data._id && data.upwd) {

    } else {
        // 인증에 필요한 데이터가 들어오지 않음
        return ResponseCode.invalid;
    }
}
module.exports = {
    get : get,
    set : set
}