const Mongoose = require('mongoose');
const COLL_NAME = 'OutOfService';
const OutOfServiceSchema = new Mongoose.Schema({
    reason : {
        type: String,
        require: true
    },
    suggest : {
        type: String,
    },
    gender : {
        type: String,
        require: true
    },
    reg_date : {
        type : Date,
        require: true
    },
    out_date : {
        type : Date,
        default : Date.now
    }
}, {
    versionKey: false
});

module.exports = Mongoose.model(COLL_NAME, OutOfServiceSchema);