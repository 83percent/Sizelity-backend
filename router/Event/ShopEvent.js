const ShopEventModel = require('../../models/ShopEventModel');
const SizelityEventModel = require('../../models/SizelityEventModel');

const ResponseCode = require('../../lib/response-code/response-code');


const get = async (request) => {
    const data = request.body;

    console.log("요청 데이터 : ", data);

    if(data && data.cate) {
        const result = {
            sizelity : null,
            shop : null
        }
        try {
            switch(data.cate) {
                case "all" : {
                    const sizelity = await SizelityEventModel.find();
                    const shop = await ShopEventModel.find();

                    result.sizelity = sizelity;
                    result.shop = shop;

                    return result;
                }
                case "shop" : {
                    const shop = await ShopEventModel.find(); // return array
                    result.shop = shop;
                    return result;

                }
                case "sizelity" : {
                    const sizelity = await SizelityEventModel.find();
                    result.sizelity = sizelity;
                    return result;
                }
                default : {
                    return ResponseCode.invalid;
                }
            }
        } catch {
            return ResponseCode.error;   
        }
    } else {
        return ResponseCode.invalid;
    }
}
const set =  async (request) => {
    const data = request.body;
    if(data) {
        const event = new ShopEventModel(data);
        try {
            const result = await event.save();
            console.log("Event 추가 결괴 : ", result);
            return ResponseCode.success;
        } catch {
            return ResponseCode.error;
        }
    } else {
        return ResponseCode.invalid;
    }
}
const remove = () => {

}
const update = () => {

}

module.exports = {
    get : get,
    set : set,
    remove : remove,
    update : update
}

/*
    Event get Request Format
    {
        cate : String, -- must be : [all, shop, sizelity]
    }
*/

/*
    Event get Response Data Format
    {
        sizelity : [],
        shop : []
    }

*/