const mongoose = require('mongoose');
const COLL_NAME = "user";


const UserProductModel = new mongoose.Schema({
    /* status : { type: Number, default: -200, require: true }, */
    info : {
        sname : { type : String },
        pname : { type : String },
        nick : { type : String },
        ptype : { type : String, require: true },
        subtype : { type: String }
    },
    praw : {
        domain : { type : String },
        type : { type : String },
        code : { type : String },
        full : { type : String }
    },
    size : {}
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
    terms : {
        service : {
            type : Boolean,
            required : true
        },
        privacy : {
            type : Boolean,
            required : true
        }
    },
    product : [UserProductModel],
    reg_date : {
        type : Date,
        default : Date.now
    }
}, {
    versionKey: false
});

/*
    유저가 삭제 되기 전 일어나야할 일 정의
    - user_after_product 모델에서 해당 ID 삭제.
*/
UserModel.pre('findByIdAndDelete', function(next) {
    console.log("pre 미들웨어 this 값 : ");
    console.log(this);

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