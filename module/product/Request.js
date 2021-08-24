/*
    2021-08-04
    작성자 : 이재훈
*/

const StatusCode = require('../../lib/response-code/status-code');
const ProductEmptyModel = require('../../models/ProductEmptyModel');


/*
    2021-08-04 (이재훈)
    검색 시 없는 데이터를 저장
*/
async function create({domain, code, full}) {
    try {
        const request = new ProductEmptyModel({domain, code, full});
        const _r = await request.save();
        if(_r) return true;
        else return false;
    } catch(err) {
        if(err.code === 11000) return StatusCode.already;
        else return StatusCode.error;
    }
}

module.exports = {
    create
}