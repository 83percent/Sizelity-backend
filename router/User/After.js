const UserModel = require("../../models/UserModel");
const ResponseCode = require("../../lib/response-code/response-code");

const set = async (request) => {
    try {
        const data = request.body;
        if(!data._id && !data.upwd) return ResponseCode.error;
        const document = await getAfter(data._id, data.upwd);
        if(document) {
            const is = document.after.filter((element) => {
                return (element.praw.domain === data.product.praw.domain && element.praw.code === data.product.praw.code);
            });
            console.log("중복되는 데이터 : ", is);
            if(is.length === 0) {
                // 중복데이터 없음.
                document.after.push(data.product);
                await document.save((err) => {
                    if(err) {
                        console.log("After Set Error : ", err);
                        return ResponseCode.error;
                    }
                });
                return ResponseCode.success;
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
            let count = 0;
            for(const _id of data.product) {
                const d = await document.after.id(_id)
                if(d !== null && d._id) {
                    d.remove();
                    count++;
                }
            }
            if(count > 0) {
                document.save(err => {
                    if(err) return ResponseCode.error;
                });
                return ResponseCode.success;
            } else return ResponseCode.noData;
        } else {
            console.log("이용자 데이터 정보 없음")
            return ResponseCode.noData;
        }
    } catch(error) {
        console.log(error);
        return ResponseCode.error;
    }
}
const getAfter = async (id, pw) => {

        try {
            const userDoc = await UserModel.findOne({'_id' : id, 'upwd' : pw});
            console.log("유저 정보 : ",userDoc);
            if(userDoc._id) return userDoc;
            else return null;
        } catch(error) {
            console.log(error);
            return null;
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