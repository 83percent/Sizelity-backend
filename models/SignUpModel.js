const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    name : {
        first : {
            type : String,
            required : true
        },
        last : {
            type: String,
            required : true,
            trim : true
        }
    },
    uid : {
        type : String,
        required : true,
        unqiue: true
    },
    uPassword : {
        type : String,
        required : true,
        trim : true
    },
    reg_date : {
        type : Date,
        default : Date.now
    }
});

module.exports = signupSchema;