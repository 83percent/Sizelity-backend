const UserModel = require("../../models/UserModel");
const ResponseCode = require("../../lib/response-code/response-code");
/*
    User Fav Product setter / getter
*/

const get = async (id) => {
    try {
        console.log(id);    
        const user = await UserModel.findById(id);
        if(user) return user.product;
        else return ResponseCode.noUser;
    } catch {
        return ResponseCode.error;
    }
} // GET : /user/product/:id

const set = async (user, data) => {
    try {
        // 중복확인
        if(data?.praw?.domain) {
            const is = user.product.filter((element) => {
                return (element.praw.domain === data.praw.domain && element.praw.code === data.praw.code); 
            });
            console.log("중복 ? : ", is);
            if(is.length !== 0) return ResponseCode.already;
        }
        user.product.push(data);
        const result = await user.save();
        console.log("추가 결과 : ", result);
        if(result._id) return ResponseCode.success;
        else return ResponseCode.error;
    } catch {
        return ResponseCode.error;
    }
} // POST /user/product/:id

const update = async (user, data) => {
    try {
        console.log("Client data : ", user);
        if(!user) return ResponseCode.noData;

        const product = await user.product.id(data._id);
        console.log("변경하려는 상품 : ", product );
        product.info = data.info;
        product.size = data.size;
        const result = await user.save();
        if(result._id) return ResponseCode.success;
        else return ResponseCode.error;
    } catch(err) {console.log(err);return ResponseCode.error}
}


const remove = async (id, deleteID) => {
    try {
        const user = await UserModel.findById(id);
        if(!user) return ResponseCode.noUser;

        const product = await user.product.id(deleteID);
        if(product !== null && product._id) {
            product.remove();
            const result =  await user.save(err => {
                if(err) return false;
                else return true;
            });
            if(!result) return ResponseCode.success
            else return ResponseCode.error;
        } else return ResponseCode.noData;
    } catch(error) {
        console.log(error);
        return ResponseCode.error;
    }
} // DELETE /user/product/:deleteID

module.exports = {get, set, update, remove}