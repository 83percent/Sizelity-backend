const Mongoose = require('mongoose');
const COLL_NAME = 'service_notice';

const NoticeModel = new Mongoose.Schema({},{ collection : 'service_notices'});

module.exports = Mongoose.model(COLL_NAME, NoticeModel);