const UserModel = require("../../models/UserModel");
const ResponseCode = require("../../lib/response-code/response-code");
const passport = require('passport');

const get = async (id) => {
    try {
        const user = await UserModel.findById(id);
        if(!user) return ResponseCode.error;
        return user.after;
    } catch(error) {
        return ResponseCode.error;
    }
}

const set = async (id, data) => {
    try {
        console.log(id)
        const user = await UserModel.findById(id);
        console.log(user);
        if(!user) return ResponseCode.noUser;
        console.log("추가할 Client data : ", user);
        console.log("추가하려는 항목 : ", data);
        // 중복확인
        const is = user.after.filter((element => {
            return (element.praw.domain === data.product.praw.domain && element.praw.code === data.product.praw.code);
        }));
        if(is.length !== 0) return ResponseCode.already;
        user.after.unshift(data.product);
        const result = await user.save((err) => {
            if(err) return false;
        });
        if(!result) return ResponseCode.success;
        else return ResponseCode.error;

    } catch(err) {
        console.log(err);
        return ResponseCode.error;
    }
}

// REMOVE 수정해야함 
const remove = async (id, deleteID) => {
    try {
        const user = await UserModel.findById(id);
        if(!user) return ResponseCode.noUser;
        
        const product = await user.after.id(deleteID);
        if(product !== null && product._id) {
            product.remove();
            const result =  await user.save(err => {
                if(err) return false;
                else return true;
            });
            if(!result) return ResponseCode.success
            else return ResponseCode.error;
        } else return ResponseCode.noData;
    } catch {
        return ResponseCode.error;
    }
}
module.exports = {
    set : set,
    get : get,
    remove : remove
}
/*
    Format
set Request Format
{
    _id : String,
    upwd : String,
    product : {
        praw : {
            domain : String,
            code : String,
            full : String
        },
        info : {
            sname : String,
            pname : String,
            subType : String
        }
    }
}

remove Requset Format
{
    _id : String,
    upwd : String
    product : {
        _id : String
    }
}

[
    {
        praw : {
            domain : String,
            code : String,
            full : String
        }
        info : {
            sname : String,
            pname : String,
            subType : String
        }
    }  
]
*/