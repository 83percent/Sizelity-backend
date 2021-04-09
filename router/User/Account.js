const UserModel = require("../../models/UserModel");
const ResponseCode = require("../../lib/response-code/response-code");
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
    updata : update
}