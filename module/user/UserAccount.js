const {startSession} = require('mongoose');

const UserModel = require("../../models/UserModel");
const OutOfServiceModel = require("../../models/OutOfServiceModel");
const UserAfterProductModel = require("../../models/UserAfterProductModel");

const StatusCode = require("../../lib/response-code/status-code");

/*
    계정 업데이트
    2021-08-28(이재훈)
*/
async function update(id, data) {
    try {
        await UserModel.findByIdAndUpdate(id, data);
        return StatusCode.success;
    } catch(err) {
        console.log(err);
        return StatusCode.error;
    }
}

/*
    계정삭제
    2021-08-28 (이재훈)
    트랜잭션 적용
*/

async function remove(id, reason) {
    try {
        let user = await UserModel.findByIdAndDelete(id);
        const {gender, reg_date} = user;
        user = new OutOfServiceModel({reason, gender, reg_date});
        await user.save();
        await UserAfterProductModel.findByIdAndDelete(id);
        return StatusCode.success;
    } catch(error) {
        console.error(error);
        
        return StatusCode.error;
    }
}

module.exports = {
    update,
    remove
}