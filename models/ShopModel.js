const Mongoose = require('mongoose');
const COLL_NAME = 'shop';
const ShopSchema = new Mongoose.Schema({
    info : {
        name : {
            type: String,
            require: true
        }
    },
    url : {
        home : {
            type: String,
            require: true
        },
        type : {
            type: String,
            require: true
        },
        domain : {
            type: String,
            require: true
        }
    },
});

module.exports = Mongoose.model(COLL_NAME, ShopSchema);