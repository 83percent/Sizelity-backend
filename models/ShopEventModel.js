const Mongoose = require('mongoose');
const COLL_NAME = 'shops_event';
const ShopEventSchema = new Mongoose.Schema({
    sname : {type:String, require:true},
    image : {type: String, require: true},
    link : {type:String, require:true},
    tag : [],
    expires : {
        start : {
            type: Date,
            require: true,
            default : Date.now
        },
        end : {
            type: Date,
            require: true
        }
    },
    reg_date : {
        type : Date,
        default : Date.now
    }
}, {
    versionKey: false
});

module.exports = Mongoose.model(COLL_NAME, ShopEventSchema);

/*
{
    _id : ObjectId,
    sname : String,
    image : String, -- image path.
    link : String,
    tag : [String], 
    expires : {
        start : Date,
        end : Date
    },
    reg_date : Date
}
*/