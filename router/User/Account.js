const UserModel = require("../../models/UserModel");

const Response_noData = {status : 404};

const set = async (request) => {
    try {
        
    } catch(error) {
        console.log(error);
    }
}
const get = async (request) => {
    try {
        const data = request.body;
        // {uid , upwd}
        if(data.uid && data.upwd) {
            const result = await UserModel.findOne(data);
            if(result) {
                return result;
            } else {
                return Response_noData;
            }
        }
    } catch(error) {
        console.log(error);
    }
}
module.exports = {
    get : get,
    set : set
}