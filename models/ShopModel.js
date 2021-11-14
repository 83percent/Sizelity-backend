const Mongoose = require('mongoose');
const COLL_NAME = 'shop';
const ShopSchema = new Mongoose.Schema({
    count : {
        compare : {
            type: Number,
            default: 0
        },
        provide : {
            type: Number,
            default: 0
        }
    }
},{ collection : 'shops'});


module.exports = Mongoose.model(COLL_NAME, ShopSchema);