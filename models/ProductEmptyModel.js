const Mongoose = require('mongoose');
const COLL_NAME = 'Product_Empty';
const ProductEmptySchema = new Mongoose.Schema({
    domain : {
        type: String,
        require: true
    },
    code : {
        type: String,
        require: true
    },
    full : {
        type: String,
        require: true
    },
    reg_date : {
        type: Date,
        defualt: Date.now
    }
});

/* NoDataSchema.index({
    sname : 1,
    code : 1
}, {
    unique : true
}); */
module.exports = Mongoose.model(COLL_NAME, ProductEmptySchema);