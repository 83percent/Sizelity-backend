const Mongoose = require('mongoose');
const COLL_NAME = 'coupon';
const CouponSchema = new Mongoose.Schema({
    
});

module.exports = Mongoose.model(COLL_NAME, CouponSchema);