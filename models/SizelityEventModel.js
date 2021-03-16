const Mongoose = require('mongoose');
const COLL_NAME = 'sizelity_event';
const SizelityEventSchema = new Mongoose.Schema({
    title : {type:String, require:true},
    image : {type: String, require: true},
    link : {type: String, require: true},
    expires : {
        start : {type:Date, require:true},
        end : {type:Date, require:true}
    },
    reg_date : {
        type : Date,
        default : Date.now
    }
}, {
    versionKey: false
});

module.exports = Mongoose.model(COLL_NAME, SizelityEventSchema);