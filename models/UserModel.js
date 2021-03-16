const mongoose = require('mongoose');
const COLL_NAME = "user";


const UserProductModel = new mongoose.Schema({
    status : { type: Number, default: -200, require: true },
    info : {
        sname : { type : String },
        pname : { type : String },
        nick : { type : String },
        ptype : { type : String, require: true },
        subtype : { type: String }
    },
    praw : {
        domain : { type : String, require: true },
        type : { type : String, require: true },
        code : { type : String, require: true },
        full : { type : String, require: true}
    },
    size : {}
});
const AfterModel = new mongoose.Schema({
    praw : {
        type : {
            domain : {type : String, require: true},
            code : {type : String, require: true},
            full : {type: String, required: true}
        },
    },
    info : {
        type : {
            sname : {type: String, required: true},
            pname : {type: String, required: true},
            subtype : {type: String, required: true}
        },
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
    product : [UserProductModel],
    after : [AfterModel],
    reg_date : {
        type : Date,
        default : Date.now
    }
}, {
    versionKey: false
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
/*
    after format
{
    praw : {
        domain : String,
        code : String,
        full : String
    }
    info : {
        sname : String,
        pname : String,
        subType : String
    }
}
*/