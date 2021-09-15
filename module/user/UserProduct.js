const UserModel = require("../../models/UserModel");
const StatusCode = require("../../lib/response-code/status-code");

/*
    사용자 옷장 데이터 불러오기.
    마지막 수정 : 2021-08-29 (이재훈)
    사용안함.
*/
const get = async (id) => {
    try {
        const user = await UserModel.findById(id, ['product']);
        if(user) return user.product;
        else return StatusCode.auth;
    } catch(err) {
        console.error(err);
        return StatusCode.error;
    }
} // GET : /user/product/:id

/*
    사용자 옷장 데이터 저장.
    마지막 수정 : 2021-08-29 (이재훈)
*/
const MAXIMUM_PRODUCT_COUNT = 100;
async function set(user, data) {
    try {
        // 최대 갯수
        if(user.product.length > MAXIMUM_PRODUCT_COUNT) {
            return StatusCode.noCraete; // 202
        }
        // 중복확인
        if(data?.praw?.domain) {
            const is = user.product.filter((element) => {
                return (element.praw.domain === data.praw.domain && element.praw.code === data.praw.code); 
            });
            //console.log("중복 ? : ", is);
            if(is.length !== 0) return StatusCode.already; // 419
        }

        user.product.unshift(data);
        await user.save();
        return StatusCode.success; // 200
    } catch {
        return StatusCode.error; // 500
    }
} // POST /user/product/:id

const update = async (user, data) => {
    try {
        const product = await user.product.id(data._id);
        product.info = data.info;
        product.size = data.size;
        
        const result = await user.save();
        if(result._id) return StatusCode.success;
        else return StatusCode.error;
    } catch(err) {console.log(err);return StatusCode.error}
}

/*
    사용자 옷장 데이터 삭제.
    마지막 수정 : 2021-08-08 (이재훈)
*/
const remove = async (id, productID) => {
    try {
        const user = await UserModel.findById(id, ["product"]);
        if(!user) return StatusCode.invalid;

        const product = await user.product.id(productID);
        if(product !== null && product._id) {
            product.remove();
            const result =  await user.save(err => {
                if(err) return false;
                else return true;
            });
            if(!result) return StatusCode.success
            else return StatusCode.error;
        } else return StatusCode.noData;
    } catch(error) {
        console.log(error);
        return StatusCode.error;
    }
} // DELETE /user/product/:id/:productID

module.exports = {get, set, update, remove}