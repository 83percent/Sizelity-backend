// Model
const ShopModel = require("../../models/ShopModel");

async function done({compareDomain, provideDomain}) {
    // Compare Domain ++
    // console.log(`카운팅 발생 ${compareDomain} - ${provideDomain}`)
    if(compareDomain) {
        try {
            const shop = await ShopModel.findOne({domain : compareDomain}, ['count']);
            if(shop.count?.compare) shop.count.compare = 1;
            else shop.count.compare++;
            await shop.save();
        } catch(error) {
            console.error(error);
        }
    }
    // Provide Domain ++
    if(provideDomain) {
        try {
            const shop = await ShopModel.findOne({domain : provideDomain}, ['count']);
            if(shop.count?.provide) shop.count.provide = 1;
            else shop.count.provide++;
            await shop.save();
        } catch(error) {
            console.error(error);
        }
    }
}

module.exports = {
    done
}