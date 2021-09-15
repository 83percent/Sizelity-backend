/*
    마지막 수정 : 2021-09-13 이재훈

    외부 Collection의 관계 ref 를 연결하기 위해서 수정
*/
const Mongoose = require('mongoose');
const COLL_NAME = 'event';
const EventModel = new Mongoose.Schema({shopRef : {
    type : Mongoose.Schema.Types.ObjectId,
    ref : "shop",
    required : true
}}, {collection : 'events'});

module.exports = Mongoose.model(COLL_NAME, EventModel);

/*
{
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
}
*/