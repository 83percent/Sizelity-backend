const ProductModel = require('../../models/ProductModel');
const ProductEmptyModel = require('../../models/ProductEmptyModel');
/*
    상품 정보 불러오기
    @params shop
    @params code
*/
async function getProduct(shop, code) {
    try {
        const product = await ProductModel.findOne({"praw.domain": shop, "praw.code":code});
        if(!product?._id) return null; 
        else {
            return product;
        }
    } catch {return 'error';}
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
    const isExist = await ProductEmptyModel.findOne({domain:shop, code},['_id']);
    
    if(isExist?._id) return true;
    else {
        try {
            const emptyProduct = new ProductEmptyModel({domain:shop, code, full, req_date: new Date()});
            emptyProduct.save();
            return true;
        } catch(err) {
            console.log(err);
            return false;
        }
    }
}

module.exports = {getProduct, getProductFindById, setEmptyProduct}