const UserModel = require("../../models/UserModel");
const ResponseCode = require("../../lib/response-code/response-code");
/*
    User Fav Product setter / getter
*/

const get = async (request) => {
    try {
        const data = request.body;
        if(!data._id && !data.upwd) return ResponseCode.invalid;
        const doc = await UserModel.findOne({'_id' : data._id, 'upwd' : data.upwd});
        if(doc) return doc.product;
        else return ResponseCode.noData;
        
    } catch(error) {
        console.error(error);
        return ResponseCode.error;
    } 
}

const set = async (request) => {
    try {
        const data = request.body;
        // 1. 회원 여부 확인
        if(!data._id && !data.upwd) return ResponseCode.invalid;
        const doc = await UserModel.findOne({'_id' : data._id, 'upwd' : data.upwd});
        if(doc === null) throw ResponseCode.noUser;
        if(!doc.product) doc.product = new Array([]);
        else {
            // 추가하려는 데이터 중복확인
            const is = doc.product.filter((element) => {
                return (element.praw.domain === data.product.praw.domain && element.praw.code === data.product.praw.code); 
            });
            if(is.length !== 0) {
               return ResponseCode.already;
            }
        }
        // 3. 중복확인이 필요없거나, 중복이 안된경우 저장
        console.log("추가 직전의 데이터 : ",data.product);
        doc.product.push(data.product);
        await doc.save(err => {
            if(err) console.log(err);
            return ResponseCode.error;
        });
        return ResponseCode.success;
        
    } catch(error) {
        console.log(error);
        return ResponseCode.invalid;
    }
}

const remove = async (request) => {
    try {
        const data = request.body;
        if(!data._id && !data.upwd) return ResponseCode.invalid;
        const doc = await UserModel.findOne({'_id' : data._id, 'upwd' : data.upwd});
        if(doc === null) throw ResponseCode.noUser;
        else {
            const d = await doc.product.id(data.product._id);
            let result = null;
            if(d !== null && d._id) {
                d.remove();
                const ab = await doc.save(err=> {
                    if(err) return ResponseCode.error;
                });
                if(ab && ab.status === -200) {
                    return ResponseCode.error;
                } else return ResponseCode.success;
            } else {
                return ResponseCode.noData;
            }
        }
    } catch(error) {
        console.log(error);
        return ResponseCode.error;
    }
}

module.exports = {
    get : get,
    set : set,
    remove : remove
}