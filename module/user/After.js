const UserModel = require("../../models/UserModel");

const get = async (id) => {
    try {
        const user = await UserModel.findById(id);
        if(!user) return null;
        return user.after;
    } catch(error) {
        return null;
    }
}

const set = async (id, data) => {
    try {
        const user = await UserModel.findById(id);
        if(!user) return false;

        // 50개 초과 저장 불가
        if(user.after.length > 50) { return null; }

        // 중복확인 및 존재하면 앞으로 당김
        const {domain , code} = data.product.praw;
        let pass = false;
        for(const index in user.after) {
            const {domain : _domain, code : _code} = user.after[index].praw;
            if(domain == _domain && code == _code) {
                pass = true;
                if(index != 0) {
                    user.after.splice(index,1);
                    user.after.splice(0,0,data.product);
                    await user.save();
                }
                break;
            }
        }

        // 중복이여서 앞으로 당기고 true 반환
        if(pass) return true;
        // 중복된게 없어서 앞에 추가
        user.after.unshift(data.product);
        const result = await user.save((err) => {
            if(err) return false;
        });
        if(!result) return true;
        else return false;

    } catch(err) {
        console.log(err);
        return false;
    }
}
/*
    나중에 볼 상품 삭제
    @param id :String           삭제할 유저의 고유ID
    @param deleteIDs :Array     삭제하려는 상품의 고유ID 모음 배열

    @return true                삭제 성공
    @return false               식제 실패
    @return null                사용자 정보를 찾을 수 없음

    2021/05/06
*/
const remove = async (id, deleteIDs) => {
    try {
        const user = await UserModel.findById(id);
        if(!user) return null;
        
        let pass = true;
        for(const deleteID of deleteIDs) {
            try {
                await user.after.id(deleteID).remove();
            } catch {
                pass = false;
                break;
            }
        }
        if(pass) {
            await user.save();
            return true;
        } else return false;
    } catch(err) {
        console.log(err);
        return false;
    }
}
module.exports = {
    set,
    get,
    remove
}
/*
    Format
set Request Format
{
    _id : String,
    upwd : String,
    product : {
        praw : {
            domain : String,
            code : String,
            full : String
        },
        info : {
            sname : String,
            pname : String,
            subType : String
        }
    }
}

remove Requset Format
{
    _id : String,
    upwd : String
    product : {
        _id : String
    }
}

[
    {
        praw : {
            domain : String,
            code : String,
            full : String
        }
        info : {
            sname : String,
            pname : String,
            subType : String
        }
    }  
]
*/