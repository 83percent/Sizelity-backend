const StatusCode = require("../../lib/response-code/status-code");
const ADEventModel = require("../../models/ServicePopupModel");

async function get(target) {
    let count = 0;
    if(!target) count = await ADEventModel.collection.countDocuments();
    else count = await ADEventModel.collection.countDocuments({target});
    //const count = await ADEventModel.collection.countDocuments({target});

    switch(count) {
        case 0 : return null;
        case 1 : {
            if(!target) return await ADEventModel.findOne({}, ['url', 'image']);
            else return await ADEventModel.findOne({target}, ['url', 'image']);
        }
        default : {
            if(!target) return await ADEventModel.findOne({}, ['url', 'image']).skip(rand(count));
            else return await ADEventModel.findOne({target}, ['url', 'image']).skip(rand(count));
        }
    }
}

function rand(max) {
    return Math.floor(Math.random() * max);
}
module.exports = {
    get
}