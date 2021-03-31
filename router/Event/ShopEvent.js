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
const set =  async (data) => {
    try {
        const isEvent = await ShopEventModel.findOne({sname: data.sname});
        if(isEvent) return ResponseCode.already;
        else {
            const event = new ShopEventModel(data);

            // Mongoose save 하면 return 뭐되는지 보고 해당 return 에 맞게 수정하기
            event.save();
        }

    } catch {return ResponseCode.error};
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