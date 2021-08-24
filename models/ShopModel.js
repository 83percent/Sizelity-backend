const Mongoose = require('mongoose');
const COLL_NAME = 'shop';
const ShopSchema = new Mongoose.Schema({},{ collection : 'shops'});

module.exports = Mongoose.model(COLL_NAME, ShopSchema);