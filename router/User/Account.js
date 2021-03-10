const UserModel = require("../../models/UserModel");
const ResponseCode = require("../../lib/response-code/response-code");

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
    if(data.uid && data.upwd && data.name && data.gender) {
        const account = new UserModel({
            uid : data.uid,
            upwd : data.upwd,
            name : data.name,
            gender : data.gender,
            privacy : data.privacy,
            alert : data.alert,
        });
        try {
            const result = await account.save();
            console.log("SAVE 결과 : ", result );
            if(result._id) {
                return {status : 200};
            } else return ResponseCode.error;
        } catch(error) {
            if(error.name === 'ValidationError') return ResponseCode.invalid;
            switch(error.code) {
                case 11000 : {
                    // Already Exist
                    return ResponseCode.already;
                }
                default : {
                    return ResponseCode.error;
                }
            }
        }
    } else {
        return ResponseCode.invalid;
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