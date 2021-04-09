const ProductEmptyModel = require('../../models/ProductEmptyModel');
const ProductModel = require('../../models/ProductModel');
const ResponseCode = require('../response-code/response-code');


/*
    return
    {status:200} : save success
    {status:-404} : insert data invalid
    {status:0} : already
    {status:-200} : catch error
    
*/
async function set(domain, code, full) {
    if(!domain || !code) return ResponseCode.invalid;
    try {
        const isExist = await ProductEmptyModel.findOne({domain, code});
        console.log("Find Date in Empty Product", isExist);
        if(isExist) return ResponseCode.already;
        
        const product = new ProductEmptyModel({domain, code, full});
        product.save();
        return ResponseCode.success;
    } catch(err) {
        console.log(err);
        return ResponseCode.error;
    }
}


async function get(domain, code) {
    if(domain && code) {
        // Element Find
        return await ProductEmptyModel.findOne({domain,code});
    } else if(domain && !code) {
        // domain Find
        return await ProductEmptyModel.find({domain});
    } else if(!domain && !code) {
        // All Find
        return await ProductEmptyModel.find();
    } else {
        // Error : !domain && code
        return ResponseCode.error;
    }
} // get
// - Need to .exec()???

async function remove(id) {
    if(!id) return ResponseCode.invalid;
    let removeProduct = null;
    try {
        removeProduct = await ProductEmptyModel.findOneAndRemove({_id:id}).exec();
    } catch(err) {
        console.log(err);
        return ResponseCode.error;
    }
    
    console.log("Remove Empty Product Data : ", removeProduct);
    
    if(removeProduct) return ResponseCode.success;
    else return ResponseCode.error;
}

async function update(id, data) {
    // 해당 데이터에 사이즈 정보를 추가한 상황
    // Product Collection 이미 데이터가 존재하는지 확인
    // Product에서 set을 할때도 Empty에 정보가 있는지 한번 확인해야함.
    const emptyProduct = await ProductEmptyModel.findById(id);
    
}

module.exports = {set, get, remove, update}