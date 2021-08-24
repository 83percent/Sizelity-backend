const UserModel = require("../../models/UserModel");
const OutOfServiceModel = require("../../models/OutOfServiceModel");

const UserAfter = require("./UserAfter");

const ResponseCode = require("../../lib/response-code/response-code");
const bcrypt = require('bcrypt');
const StatusCode = require("../../lib/response-code/status-code");
const saltRounds = 10;

const update = async (user, data) => {
    const {type} = data;
    let userData = null;
    try {
        userData = await UserModel.findById(user._id);
        if(!userData) return ResponseCode.noData;
        const isSame = bcrypt.compareSync(data.now, userData.upwd);
        if(!isSame) return ResponseCode.noUser;
    } catch {return ResponseCode.error;}

    switch(type) {
        case 'password' : {
            const {change} = data;
            // 둘중 하나라도 없으면 작동 안함.
            if(!now || !change) return ResponseCode.invalid;
            try {
                const salt = bcrypt.genSaltSync(saltRounds);
                const hash = bcrypt.hashSync(change, salt);
                userData.upwd = hash;
                const result = await userData.save();
                if(result._id) return ResponseCode.success;
                else return ResponseCode.error;
            } catch {
                return ResponseCode.error;
            }
        } // cate 'password'
        case 'info' : {
            let pass = true;
            for(let cate of data.cate) {
                switch(cate) {
                    case 'email' : {
                        if(!data.uid) pass *= false;
                        else userData.uid = data.uid
                        break;
                    }
                    case 'name' : {
                        if(!data.name) pass *= false;
                        else userData.name = data.name
                        break;
                    }
                    default : {pass *= false;}
                }
            }
            if(!pass) return ResponseCode.invalid;
            const result = await userData.save();
            if(result._id) return ResponseCode.success;
            else return ResponseCode.error;
        } // case 'info'
        default : {
            return ResponseCode.invalid;
        }
    }
}

/*
    계정삭제
    2021-08-10 (이재훈)
*/
const optionList = ["lessInfo", "howCan", "otherService", "uncomfortable", "other"];
async function remove(id, password, option, suggest) {
    if(password.length < 8 || !optionList.includes(option)) return StatusCode.invalid; // 400
    try {
        // 비밀번호 일치 확인
        const isSame = bcrypt.compareSync(password, user.upwd);
        if(!isSame) return StatusCode.permission; // 403

        await UserModel.findByIdAndDelete(id).then(async result => {
            await UserAfter.outOfService(result._id);
            const data = new OutOfServiceModel({
                reason : option,
                gender : user.gender,
                reg_date : user.reg_date,
            });
            if(!suggest) data.suggest = suggest;
        
            await data.save();
        }).catch(err => {
            throw new Error(err)
        });
        return StatusCode.success; // 200
    } catch {
        return StatusCode.error // 500
    }
    
}

module.exports = {
    update,
    remove
}