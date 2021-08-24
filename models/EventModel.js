/*
    마지막 수정 : 2021-08-23 이재훈
*/
const Mongoose = require('mongoose');
const COLL_NAME = 'event';
const EventModel = new Mongoose.Schema({
    shopRef : {
        type : Mongoose.Schema.Types.ObjectId,
        ref : "shop",
        required : true
    },
    name : {
        type: String,
        required: true
    },
    text : {
        type: String
    },
    type : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        required: true
    },
    url : {
        type: String,
        required: true
    },
    target : {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

module.exports = Mongoose.model(COLL_NAME, EventModel);

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