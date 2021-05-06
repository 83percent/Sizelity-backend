const Mongoose = require('mongoose');
const COLL_NAME = 'Product_Empties';
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
    req_date : {
        type: Date,
        defualt: Date.now,
        require: true
    }
});

/* NoDataSchema.index({
    sname : 1,
    code : 1
}, {
    unique : true
}); */
module.exports = Mongoose.model(COLL_NAME, ProductEmptySchema);