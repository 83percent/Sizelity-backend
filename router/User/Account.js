const UserModel = require("../../models/UserModel");
const ResponseCode = require("../../lib/response-code/response-code");
const bcrypt = require('bcrypt');
const saltRounds = 10;


// POST Auto Login
const autoLogin = async (req) => {
    try {
        const {_id, password} = req.body;
        console.log("자동로그인 try");
        const account = await UserModel.findById(_id);
        if(password === account.upwd) {
            return {_id: account._id, name: account.name, upwd: account.upwd}
        } else {
            return ResponseCode.noUser;
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
    autoLogin : autoLogin,
    set : set
}