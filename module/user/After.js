const UserModel = require("../../models/UserModel");

/*
    나중에 볼 상품 목록 불러오기
    @params id :String      요청한 사용자의 고유 ID

    @return [...] :Array    불러오기 성공
    @return null            사용자 정보를 불러올 수 없음
*/
async function get(id) {
    try {
        const user = await UserModel.findById(id);
        if(!user) return null;
        return user.after;
    } catch(error) {
        return null;
    }
} // get()


/*
    나중에 볼 상품 추가
    @param id :String       추가하려는 사용자의 고유ID
    @param data :Object     추가하려는 상품의 Data Object

    @return true    추가 성공
    @return false   추가 실패
    @return null    최대 개수 초과
*/
let maximum = 50;
async function set(id, data) {
    try {
        const user = await UserModel.findById(id);
        if(!user) return false;

        // 50개 초과 저장 불가
        if(user.after.length > maximum) { return null; }

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
} // set



/*
    나중에 볼 상품 삭제
    @param id :String           삭제할 유저의 고유ID
    @param deleteIDs :Array     삭제하려는 상품의 고유ID 모음 배열

    @return true                삭제 성공
    @return false               식제 실패
    @return null                사용자 정보를 찾을 수 없음

    2021/05/06
*/
async function remove(id, deleteIDs) {
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
} // remove

module.exports = {
    set,
    get,
    remove
}
/*
======================
        Format
======================
get Request Format [
    ... {
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
]
set Request Format
{
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

- remove Requset Format
    deleteIDs : [...id]

*/