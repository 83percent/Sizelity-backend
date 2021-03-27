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

const set = async (id, data) => {
    try {
        const user = await UserModel.findById(id);
        console.log("Client data : ", user);
        if(!user) return ResponseCode.noUser;
        // 중복확인
        const is = user.product.filter((element) => {
            return (element.praw.domain === data.product.praw.domain && element.praw.code === data.product.praw.code); 
        });
        if(is.length !== 0) return ResponseCode.already;

        user.product.push(data.product);
        const result = await user.save(err => {
            if(err) console.log(err);
            return ResponseCode.error;
        });
        if(!result) return ResponseCode.success;
        else return ResponseCode.error;
    } catch {
        return ResponseCode.error;
    }
} // POST /user/product/:id

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

module.exports = {
    get : get,
    set : set,
    remove : remove
}