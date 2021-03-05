const mongoose = require('mongoose');
const COLL_NAME = "user_product";
const UserProductModel = new mongoose.Schema({
    ucode : {
        type: Schema.Types.ObjectId,
        require: true,
        unique: true
    },
    
    
}, {
    versionKey : false
});
UserProductModel.index({_id : 1},{unqiue: true});
module.exports = mongoose.model(COLL_NAME, UserProductModel);

/*
    product : [
        {
            praw : {
                domain : String,
                type : String,
                code : String,
                full : String
            },
            info : {
                sname : String,
                pname : String,
                nick : String,
                ptype : {
                    type : String,
                    require : true
                },
                subType : {
                    type : String,
                    require : true
                }
            }
            size : {
                name : {
                    type : String,
                    require : true
                }
            }
        }
    ]
*/