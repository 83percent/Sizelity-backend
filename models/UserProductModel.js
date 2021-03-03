const mongoose = require('mongoose');
const COLL_NAME = "user_product";
const UserProductModel = new mongoose.Schema({
    _id : {
        type: Schema.Types.ObjectId,
        require: true,
        unique: true
    }
    
});
UserProductModel.index({_id : 1},{unqiue: true});
module.exports = mongoose.model(COLL_NAME, UserProductModel);  