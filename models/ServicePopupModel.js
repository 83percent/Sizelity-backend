const Mongoose = require('mongoose');
const COLL_NAME = 'service_popup';

const ServicePopup = new Mongoose.Schema({
    image : {
        type: String
    },
    url : {
        type: String,
        required: true
    },
    target : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        required: true
    }
}, {
    versionKey: false
});

module.exports = Mongoose.model(COLL_NAME, ServicePopup);