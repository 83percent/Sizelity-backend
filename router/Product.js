const express = require('express');
const router = express.Router();
const ProductModel = require('../models/ProductModel');


/*
    ==================================================
    Product index : ( _id ), ( info.sname, praw.code )

    status 
    -404 : Invalid Request Data
    -200 : Error
    200 : Success
    404  : No Data
    ==================================================
*/

const Response_invalid = {status : -404};
const Response_error = {status : -200};
const Response_already = {status : 0};
const Response_noData = {status : 404};
const Response_success = {status : 200};
// Read
router.post('/get', (request, response) => {
    console.log(request.body);
    try {
        const r_d = request.body; // Request Data
        
        let query = null;
        if(r_d._id) {
            query = {'_id' : r_d._id};
        } else if(r_d.domain) {
            query = {'praw.code' : r_d.code, 'praw.domain' : r_d.domain}; // {domain : , code : , type :}
        }

        if(query === null) {
            res.send(Response_invalid);
        } else {
            findUseQuery(query, response);
        }
        
    } catch(error) {
        console.error(error);
        res.send(Response_error);
    }
});
router.get('/get', (request, response) => {
    console.log(request.query);
    try {
        const shop = request.query.shop;
        const no =  request.query.no;
        if(shop && no) {
            findUseQuery({'praw.code' : no, 'praw.domain' : shop}, response);
        }
    } catch {
        response.send(Response_error);
    }
});




// Create
router.post('/set', (request, response) => {
    // 데이터 검증과정 필요
    try {
        const sname = request.body.info.sname;
        const pcode = request.body.praw.code;
        const count = null;
        ProductModel.find({"info.sname":sname, "praw.code":pcode},(err, result) => {
            if(err) throw new Error;
            if(result.length === 0) {
                const n_p = new ProductModel(request.body);
                n_p.save((err,result) => {
                    if(err) throw new Error
                    response.send(Response_success);
                    return;
                });
            } else {
                response.send(Response_already);
                return;
            }
        });
    } catch(error) {
        response.send(Response_error);
    }
});
// Update
// Update Data Only One
// Product Size or code
router.post('/update', async (request, response) => {
    try {
        const data = request.body;
        const query = getQuery(data);
        ProductModel.updateOne(query,)



    } catch {
        response.send(Response_error);
    }
});


const getUpdateQuery = (data) => {
    if(!data.update) return null;
}
/*
    {
        ..
        update : {
            "TODO"
        }
    }
*/
// Update Data Many : ex) sname Change or praw(expect code)

// Delete
router.post('/delete', async (request, response) => {
    try {
        const data = request.body;
        let count = 0;
        if(data.domain) {
            // Many Delete 
            if(data._id && data._id.constructor === Array) {
                for(const value of data._id) {
                    const result = await ProductModel.deleteOne({"_id" : value});
                    if(result.deletedCount > 0) count += result.deletedCount;
                }
            } else if (data.code && data.code.constructor === Array) {
                for(const value of data.code) {
                    const result = await ProductModel.deleteOne({"praw.domain" : data.domain, "praw.code" : value});
                    if(result.deletedCount > 0) count += result.deletedCount;
                }
            } else {
                // Many Delete Can't, cause invalid Object data
                response.send(Response_invalid);
                return;
            }
        } else {
            // Delete only one
            const query = getQuery(data);
            if(query) {
                ProductModel.deleteOne(query, err=> {
                    if(err) throw new Error;
                    count = 1;
                });
            } else {
                response.send(Response_invalid);
                return;
            }
        }
        response.send({count : count});
    } catch(error) {
        response.send(Response_error);
    }
});

// Model.find( <query > ) => return [ <Object> ];
const findUseQuery = (query, response) => {
    ProductModel.findOne(query).then(doc => {
        if(doc) {
            console.log("FIND DATA : ", doc);
            response.send(doc);
        } else {
            console.log("doc : ", doc);
            response.send(Response_noData);
        }
    }).catch(error => {
        console.error(error);
        response.send(Response_error);
    })
}

const getDocumentOne = (query) => {
    return new Promise((resolve, reject) => {
        ProductModel.findOne(query, (err, result) => {
            if(err) throw new Error;
            resolve(result);
            
        });
    })
}

// return [ <Object> ];
const getDocument = (data) => {
    let query = null;
    if(data._id) {
        query = {"_id" : data._id}
    } else {
        try {
            query = {"praw.code": data.praw.code, "praw.domain": data.praw.domain}
        } catch {
            query = null;
        }
    }
    return new Promise((resolve, reject) => {
        let query = null;
        if(data._id) {
            query = {"_id" : data._id};
        } else {
            if(data.praw) {
                const domain = data.praw.domain;
                const code = data.praw.code;
                if(domain && code) {
                    query = {"praw.code": code, "praw.domain": domain};
                } else {
                    resolve(null);
                }
            }
        }
        resolve(ProductModel.find(query));
    });
}
const getQuery = (data) => {
    let query = null;
    if(data._id) {
        query = {"_id" : data._id}
    } else {
        try {
            const code = data.praw.code;
            const domain = data.praw.domain;
            if(code && domain) query = {"praw.code": code, "praw.domain": domain}
        } catch {
            query = null;
        }
    }
    return query;
}
module.exports = router;