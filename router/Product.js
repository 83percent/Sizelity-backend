const express = require('express');
const url = require('url');
const router = express.Router();
const ProductModel = require('../models/ProductModel');


/*
    Product index : ( _id ), ( info.sname, praw.code )

    status 
    -404 : Invalid Request Data
    -200 : Error
    200 : Success
    404  : No Data
*/
const Response_invalid = {status : -404};
const Response_error = {status : -200};
const Response_noData = {status : 404};
// Read
router.post('/get', (req, res) => {
    try {
        const r_d = req.body; // Request Data
        
        let query = null;
        if(r_d._id) {
            query = {'_id' : r_d._id};
        } else if(r_d.praw.domain) {
            query = {'praw.code' : r_d.praw.code, 'praw.domain' : r_d.praw.domain};
        }

        if(query === null) {
            res.send(Response_invalid);
        }
        ProductModel.find(query).then(doc => {
            //doc.status = 200;
            console.log("Find data count : ", doc.length);
            if(doc.length === 0) {
                res.send(Response_noData);
            } else {
                res.send(doc);
            }
        }).catch((err) => {
            console.error(err);
            res.send(Response_error);
        })
    } catch {
        res.send(Response_error);
    }
});
router.get('/get', (req, res) => {
    console.log(req);
});

// Create
router.post('/set', (request, response) => {
    try {
        const sname = request.body.info.sname;
        const pcode = request.body.praw.code;
        const count = null;
        ProductModel.find({"info.sname":sname, "praw.code":pcode},(err, result) => {
            if(err) throw new Error;
            if(result.length === 0) {
                const n_p = new ProductModel(request.body);
                n_p.save((err,result) => {
                    if(err) {
                        response.send({status : -200});
                    } else {
                        response.send({status : 200});
                    }
                });
            } else {
                response.send({status : "already"});
            }
        });
    } catch(error) {
        response.send({status : "error", error : error});
    }
});
// Update
router.post('/delete', (request, response) => {
    try {
        const sname = request.body.info.sname;
        const pcode = request.body.info.code;
        ProductModel.find({sname : sname, code : pcode}).then(() => {

        }).catch(err => {

        }) ;
    } catch {
        response.send({
            status : -200
        });
    }
    
    
});

// Delete
router.post('/update', (request, response) => {

});


const getDocument = (sname, pcode) => {
    ProductModel.find({sname : sname, code: pcode}).then(result => {

    }).catch(() => {

    });
}

module.exports = router;