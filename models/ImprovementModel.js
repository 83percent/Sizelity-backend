const Mongoose = require('mongoose');
const COLL_NAME = 'Improvement';


const ImprovementModel = new Mongoose.Schema({
    userRef : {
        type: Mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    title : {
        type: String,
        required : true
    },
    content : {
        type: String,
        required : true
    },
    reg_date : {
        type : Date,
        default : Date.now
    }
}, {
    versionKey: false
});

module.exports = Mongoose.model(COLL_NAME, ImprovementModel);
