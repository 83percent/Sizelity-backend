const UserModel = require("../../models/UserModel");
const ResponseCode = require("../../lib/response-code/response-code");
const bcrypt = require('bcrypt');
const saltRounds = 10;


// POST Auto Login


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
const update = async (user, data) => {
    const {type} = data;
    let userData = null;
    try {
        userData = await UserModel.findById(user._id);
        if(!userData) return ResponseCode.noData;
        const isSame = bcrypt.compareSync(data.now, userData.upwd);
        if(!isSame) return ResponseCode.noUser;
    } catch {return ResponseCode.error;}

    switch(type) {
        case 'password' : {
            const {change} = data;
            // 둘중 하나라도 없으면 작동 안함.
            if(!now || !change) return ResponseCode.invalid;
            try {
                const salt = bcrypt.genSaltSync(saltRounds);
                const hash = bcrypt.hashSync(change, salt);
                userData.upwd = hash;
                const result = await userData.save();
                if(result._id) return ResponseCode.success;
                else return ResponseCode.error;
            } catch {
                return ResponseCode.error;
            }
        } // cate 'password'
        case 'info' : {
            let pass = true;
            for(let cate of data.cate) {
                switch(cate) {
                    case 'email' : {
                        if(!data.uid) pass *= false;
                        else userData.uid = data.uid
                        break;
                    }
                    case 'name' : {
                        if(!data.name) pass *= false;
                        else userData.name = data.name
                        break;
                    }
                    default : {pass *= false;}
                }
            }
            if(!pass) return ResponseCode.invalid;
            const result = await userData.save();
            if(result._id) return ResponseCode.success;
            else return ResponseCode.error;
        } // case 'info'
        default : {
            return ResponseCode.invalid;
        }
    }
}
const change = {
    password : async (id, change) => {


    }
}

module.exports = {
    updata : update,
    set : set
}