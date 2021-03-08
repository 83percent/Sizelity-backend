const UserModel = require("../../models/UserModel");
const ResponseCode = require("../../models/Response");

const set = async (request) => {
    try {
        const data = request.body;
        if(!data._id && !data.upwd) return ResponseCode.error;
        const document = await getAfter(data._id, data.upwd);

        if(document) {
            const afterArray = document.after;
            const is = afterArray.after.filter((afterArray) => {
                return (afterArray.praw.domain === data.product.domain && afterArray.praw.code === data.product.code);
            });
            if(is.length === 0) {
                // 중복데이터 없음.
                afterArray.push(data.product);
                await document.save((err, result) => {
                    if(err) {
                        console.log("After Set Error : ", err);
                        return ResponseCode.error;
                    } else {
                        return result;
                    }
                });
            } else return ResponseCode.already;

        } else {
            return ResponseCode.noData;
        }
    } catch(error) {
        console.log(error);
        return ResponseCode.error;
    }
}
const get = async (request) => {
    try {
        const data = request.body;
        if(!data._id && !data.upwd) return ResponseCode.error;
        const document = await getAfter(data._id, data.upwd);
        if(document) return document.after;
        else return ResponseCode.noData;;

    } catch(error) {
        console.log(error);
        return ResponseCode.error;
    }
}
const remove = async (request) => {
    try {
        const data = request.body;
        if(!data._id && !data.upwd) return ResponseCode.error;
        const document = await getAfter(data._id, data.upwd);

        if(document) {
            const d = await document.after.id(data.product._id).remove;
            if(d.deleteCount === 1) return ResponseCode.success;
            else return ResponseCode.noData;
        } else {
            return ResponseCode.noData;
        }
    } catch(error) {
        console.log(error);
        return ResponseCode.error;
    }
}
const getAfter = (id, pw) => {
    return new Promise((resolve) => {
        try {
            const userDoc = UserModel.findOne({'_id' : id, 'upwd' : pw});
            if(userDoc._id) resolve(userDoc);
            else resolve(null);
        } catch {resolve(null);}
    });
    
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