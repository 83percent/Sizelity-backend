const Mongoose = require('mongoose');
const COLL_NAME = 'reservation';

const ReservationModel = new Mongoose.Schema({
    domain : { 
        type: String,
        require: true,
        unique: true
    },
    name : {
        type: String,
        require: true
    },
    tel : {
        type: String,
        require: true
    },
    email : {
        type: String,
        require: true
    },
    privacy : {
        service : {
            type: Boolean,
            require: true
        },
        personal : {
            type: Boolean,
            require: true
        }
    },
    state : {
        type : Number,
        default : 0
    },
    reg_date : {
        type: Date,
        default : Date.now
    }
}, {
    versionKey: false
});
module.exports = Mongoose.model(COLL_NAME, ReservationModel);