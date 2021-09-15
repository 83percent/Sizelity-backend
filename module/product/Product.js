/*
    2021-08-30
    작성자 : 이재훈
*/
const Request = require('./Request');
const ProductModel = require('../../models/ProductModel');
const StatusCode = require('../../lib/response-code/status-code')
/*
    상품 정보 불러오기
    
    @params id
    @params domain
    @params code
    @params full : Empty Product Collection 에 저장하기 위한 주소

    마지막 수정 날짜 : 2021-08-30 (이재훈)
    반환 값 리턴
*/
async function get({id, domain, code, full}) {
    try {
        if(id) return await ProductModel.findById(id);
        else {
            const product = await ProductModel.findOne({"praw.domain" : domain, "praw.code" : code}, ["praw", "info", "size"]);
            if(!product) {
                if(full !== undefined) {
                    await Request.create({domain, code, full}); // 요청 데이터에 저장
                }
                return StatusCode.noData; // 204
            } else return product;
        }

    } catch {
        return StatusCode.error; //500
    }
}

module.exports = {
    get,
}