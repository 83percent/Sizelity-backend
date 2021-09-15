const NoticeModel = require("../../models/ServiceNoticeModel");
const StatusCode = require("../../lib/response-code/status-code");

async function get() { 
    try {
        const notices = await NoticeModel.find();
        if(notices) return notices;
        else return StatusCode.error;
    } catch {
        return StatusCode.error;
    }
}

module.exports = {
    get
}