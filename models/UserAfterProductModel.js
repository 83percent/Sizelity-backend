const Mongoose = require('mongoose');
const COLL_NAME = "user_after_product";

const UserAfterProductModel = new Mongoose.Schema({
    _id : {
        type : Mongoose.Schema.Types.ObjectId,
        ref : "user",
    },
    /* User : {
        type: Mongoose.Schema.Types.ObjectId,
        ref : "user",
        required: true,
        unique : true
    }, */
    list : [{
        type: Mongoose.Schema.Types.ObjectId,
        required : true,
        ref: "shop"
    }]
}, {
    versionKey: false
});

module.exports = Mongoose.model(COLL_NAME, UserAfterProductModel);