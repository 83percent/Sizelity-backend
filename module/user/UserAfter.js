const StatusCode = require("../../lib/response-code/status-code");
const UserAfterProductModel = require("../../models/UserAfterProductModel");
const Mongoose = require("mongoose");

/*
    나중에 볼 상품 목록 불러오기
    2021-08-10 (이재훈)
*/
async function get(id) {
    try {
        const after = await UserAfterProductModel
            .findById(id, ["list"])
            .populate({
                path : 'list',
                model : 'product'
            });
        if(!after) return StatusCode.auth; // 401
        return after.list;
    } catch(error) {
        console.log(error);
        return StatusCode.error; // 400
    }
} // get()


/*
    나중에 볼 상품 추가
    2021-08-10 (이재훈)
*/
const maximum = 50;
async function set(id, productID) {
    try {
        let UserProduct = await UserAfterProductModel.findById(id, ["list"]);
        if(!UserProduct) return StatusCode.auth; // 401
        else if(UserProduct?.list?.length >= maximum) return StatusCode.noCraete; // 202

        // 중복확인 후 존재하면 제일 위로
        const existIndex = UserProduct.list.indexOf(productID);
        let result = null;
        if(existIndex > -1) {
            if(existIndex === 0) {
                return StatusCode.already; // 419
            }

            let tmp = UserProduct.list[existIndex];
            UserProduct.list.splice(existIndex, 1);
            UserProduct.list.unshift(tmp);
            result = await UserProduct.save();
            
        } else {
            UserProduct.list.unshift(Mongoose.Types.ObjectId(productID));
            result = await UserProduct.save();
        }
        if(result._id) return StatusCode.success; // 200
        else StatusCode.error; // 500
    } catch(err) {
        console.log(err);
        return StatusCode.error; // 500
    }
} // set



/*
    나중에 볼 상품 삭제
    2021-08-10 (이재훈)
*/
async function remove(id, productID) {
    try {
        await UserAfterProductModel.findByIdAndUpdate(id, {
            $pull : {
                'list' : productID
            }
        }).exec();
        return StatusCode.success;
    } catch(err) {
        console.log(err)
        return StatusCode.error;
    }
} // remove

/*
    전부 삭제
*/
async function outOfService(id) {
    try {
        await UserAfterProductModel.findByIdAndDelete(id);
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    set,
    get,
    remove,
    outOfService
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