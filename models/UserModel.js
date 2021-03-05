const mongoose = require('mongoose');
const COLL_NAME = "user";


const UserProductModel = new mongoose.Schema({
    status : { type: Number, default: -200, require: true },
    info : {
        type : {
            sname : { type : String },
            pname : { type : String },
            nick : { type : String },
            ptype : { type : String, require: true },
            subType : { type: String }
        }
    },
    site : {
        /* type : {
            domain : { type : String },
            type : { type : String, require: true },
            code : { type : String },
            full : { type : String }
        } */
    },
    size : {
        type : {
            name : {type : String, require: true}
        }
    }
});

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
    product : {
        type :[ UserProductModel ]
    },
    after : [],
    reg_date : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model(COLL_NAME, UserModel);  
/*
{
            "status" : Number,
            praw : {
                domain : String,
                type : String,
                code : String,
                full : String
            },
            info : {
                sname : String,
                pname : String,
                nick : String,
                ptype : {
                    type : String,
                    require : true
                },
                subType : {
                    type : String
                }
            },
            size : {
                name : {
                    type : String,
                    require : true
                }
            }
        }
*/