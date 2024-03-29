const Mongoose = require('mongoose');
const COLL_NAME = 'product';
const ProductSchema = new Mongoose.Schema({},{collection: 'products'});
/* const ProductSchema = new Mongoose.Schema({
    shopRef : {
        type: Mongoose.Schema.Types.ObjectId,
        ref : "shop",
        required : true
    },
    praw : {
        domain : {
            type: String,
            require : true
        },
        type : {
            type: String,
            require : true
        },
        code : {
            type: String,
            require : true
        },
        full : {
            type: String,
            require : true
        }
    },
    info : {
        sname : {
            type: String,
            require : true
        },
        pname : {
            type: String,
            require : true
        },
        ptype : {
            type: String,
            require : true
        },
        subtype : {
            type: String,
            require : true
        }
    },
    size : [],
    reg_date : {
        type : Date,
        default : Date.now
    }
}, {
    versionKey: false
}); */

/* ProductSchema.index({
    sname : 1,
    code : 1
}, {
    unique : true
}); */
module.exports = Mongoose.model(COLL_NAME, ProductSchema);