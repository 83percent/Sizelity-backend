const UserModel = require("../../models/UserModel");

/*
    User Fav Product setter / getter
*/
const Response_error = {status : -200};
const Response_invalid = {status : -404};
const Response_noData = {status : 404};
const Response_already = {status : 0};

const get = async (request) => {
    try {
        const data = request.body;
        if(!data._id && !data.upwd) throw new Error;
        const favDoc = await UserModel.findOne({'_id' : data._id, 'upwd' : data.upwd});

        for(const {info} of favDoc.product) {
            console.log("_url ============ ",info);
        }

        if(favDoc) return favDoc.product;
        else return Response_noData;
        
    } catch(error) {
        console.error(error);
        return Response_invalid;
    } 
}

const set = async (request) => {
    try {
        const data = request.body;
        // 1. 회원 여부 확인
        if(!data._id && !data.upwd) throw new Error;
        const favDoc = await UserModel.findOne({'_id' : data._id, 'upwd' : data.upwd});
        if(favDoc === null) throw new Error;
        if(!favDoc.product) favDoc.product = new Array([]);
        else {
            // 2. 사이트 주소가 담긴 상품일 경우 중복확인을 통하여 저장
            // 2.1 중복 확인
            /* const __domain = data.product._url.domain;
            const __code = data.product._url.code;
            if(__domain && __code) {
                
            } */
        }

        // 3. 중복확인이 필요없거나, 중복이 안된경우 저장
        favDoc.product.push(data.product);

        console.log("저장할 데이터 : ", data.product);

        favDoc.save().then(() => {
            console.log("데이터 추가 성공");
            return favDoc;
        });
    } catch(error) {
        console.log(error);
        return Response_invalid;
    }
}

const remove = async (request) => {

}

module.exports = {
    get : get,
    set : set,
    remove : remove
}