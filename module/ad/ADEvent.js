const StatusCode = require("../../lib/response-code/status-code");
const ADEventModel = require("../../models/ServiceEventModel");

const EVENT_MAX_COUNT = 3;

async function getList({type, target}) {
    let events = null;
    try {
        if(target === undefined) events = await ADEventModel.find({type}).limit(EVENT_MAX_COUNT);
        else events = await ADEventModel.find({type, target}).limit(EVENT_MAX_COUNT);
        
        if(events === null || events?.length === 0) return StatusCode.noData; // 204
        else return events;
    } catch(error) {
        return StatusCode.error; // 500
    }
}
module.exports = {
    getList
}