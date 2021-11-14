const ShopModel = require("../../models/ShopModel");
const EventModel = require("../../models/EventModel");
const StatusCode = require("../../lib/response-code/status-code");

const EVENT_MAX_COUNT = 15;


async function getList({type, count, target}) {
    let events = null;
    try {
        if(target === undefined) events = await EventModel.find({type}).populate('shopRef').limit(EVENT_MAX_COUNT).skip(Number(count));
        else events = await EventModel.find({type, target}).populate('shopRef', ['sname']).limit(EVENT_MAX_COUNT).skip(Number(count));
        
        if(events === null || events?.length === 0) return StatusCode.noData; // 204
        else return events;
    } catch(err) {
        return StatusCode.error; // 500
    }
}

module.exports = {
    getList
}