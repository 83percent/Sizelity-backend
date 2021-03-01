const Mongoose = require('mongoose');
const COLL_NAME = 'user_shop';
const ShopUserSchema = new Mongoose.Schema({
    accept_no : {
        type: Number,
        default : -1
    },
    name : {
        type : String,
        require: true
    },
    sid : {
        type: String,
        require: true,
        unique : true
    },
    
    spwd : {
        type: String,
        require: true
    },
    domain : {
        type: String,
        require: true
    },
    shop_id : {
        type: String,
        require: true
    },
    tel : {
        type : String,
        require: true
    },
    email : {
        type : String,
    },
    privacy : {
        type: Boolean,
        require: true,
        default: false
    },
    reg_date : {
        type: Date,
        default : Date.now
    }
    
});

module.exports = Mongoose.model(COLL_NAME, ShopUserSchema);
