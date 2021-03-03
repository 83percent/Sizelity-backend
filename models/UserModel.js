const mongoose = require('mongoose');
const COLL_NAME = "user";
const UserModel = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    uid : {
        type : String,
        required : true,
        unqiue: true
    },
    upwd : {
        type : String,
        required : true,
        trim : true
    },
    gender : {
        type: String,
        required: true
    },
    privacy : {
        type: Boolean,
        default: true
    },
    alert : {
        type: Boolean,
        default : false
    },
    product : [],
    after : [],
    reg_date : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model(COLL_NAME, UserModel);  