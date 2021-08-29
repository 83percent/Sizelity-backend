/*
    2021-08-04
    작성자 : 이재훈
*/
const Request = require('./Request');

const ProductModel = require('../../models/ProductModel');
const ProductEmptyModel = require('../../models/ProductEmptyModel');
const StatusCode = require('../../lib/response-code/status-code')
/*
    상품 정보 불러오기
    @params shop
    @params code
    @params full : Empty Product Collection 에 저장하기 위한 주소
*/


/*
    마지막 수정 날짜 : 2021-08-29 (이재훈)
    반환 값 리턴
*/
async function get({id, domain, code, full}) {
    if(id) return await ProductModel.findById(id);
    else {
        const product = await ProductModel.findOne({"praw.domain" : domain, "praw.code" : code}, ["praw", "info", "size"]);
        if(!product) {
            if(full !== undefined) {
                await Request.create({domain, code, full}); // 요청 데이터에 저장
            }
            return StatusCode.noData;
        } else return product;
    }
}

async function getProduct(shop, code, full) {
    try {
        const product = await ProductModel.findOne({"praw.domain": shop, "praw.code":code});
        if(!product?._id) {
            // No Have Product Data
            if(full !== undefined) {
                this.setEmptyProduct(shop, code, full);
            }
            return StatusCode.noData; 
        } else {
            return product;
        }
    } catch(err) {
        console.log(err);
    }
}
// @params id
async function getProductFindById(id) {
    const product = await ProductModel.findById(id);
    console.log(product);
    if(!product?._id) return null; 
    else {
        return product;
    }
}
/*
    
*/

/*
    정보가 없는 상품 저장


    @return true : 저장 완료
    @return false : 저장 실패
*/
async function setEmptyProduct(shop, code, full) {
    try {
        const emptyProduct = new ProductEmptyModel({domain:shop, code, full, reg_date : new Date()});
        console.log("Empty Product Collection 저장 결과 : ",await emptyProduct.save());
        return true;
    } catch(err) {
        return false;
    }
    
    /* const isExist = await ProductEmptyModel.findOne({domain:shop, code},['_id']);
    
    if(isExist?._id) return true;
    else {
        try {
            const emptyProduct = new ProductEmptyModel({domain:shop, code, full, req_date: new Date()});
            await emptyProduct.save();
            return true;
        } catch(err) {
            console.log(err);
            return false;
        }
    } */
}

module.exports = {
    get,
    getProduct,
    getProductFindById,
    setEmptyProduct
}