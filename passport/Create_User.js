const UserModel = require("../models/UserModel");
const AfterModel = require("../models/UserAfterProductModel");
const Mongoose = require("mongoose");


async function create({uid, name, gender, provider}) {
    return new Promise((resolve, reject) => {
        UserModel.findOne({uid, provider}, (err, user) => {
            if(err) reject(err);
            else {
                if(user) resolve(user);
                else {
                    if(provider === 'naver') {
                        gender = fixGender(gender);
                    }
                    user = new UserModel({uid, name, gender, provider});
                    user.save(err => {
                        if(err) return reject(err);
                        else return resolve(user);
                    })
                }
            }
        });
    })
}
function fixGender(value) {
    switch(value) {
        case 'F' : return 'female'
        case 'M' : return 'male'
        default : return undefined
    }
}
module.exports = {create};