const UserModel = require("../../models/UserModel");

const Response_noData = {status : 404};
const Response_error = {status : -200};
const Response_invalid = {status : -404};
const Response_already = {status : 0};


const get = async (request) => {
    try {
        const data = request.body;
        // {uid , upwd}
        if(data.uid && data.upwd) {
            const result = await UserModel.findOne(data);
            if(result) {
                return result;
            } else {
                return Response_noData;
            }
        }
    } catch(error) {
        console.log(error);
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
            } else return Response_error;
        } catch(error) {
            if(error.name === 'ValidationError') return Response_invalid;
            switch(error.code) {
                case 11000 : {
                    // Already Exist
                    return Response_already;
                }
                default : {
                    return Response_error;
                }
            }
        }
    } else {
        return Response_invalid;
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
        return Response_invalid;
    }
}
module.exports = {
    get : get,
    set : set
}