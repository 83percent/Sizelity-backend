const { setFlagsFromString } = require('v8');
const __db = require('../../lib/db/Mongo');

// Field
const COLL_NAME = "product";
/* const set = (query) => {
    query = { // 0
        status : 200, // 실제 서버에 들어갈때는 없애도됨.
        pcode : "PAAA0001",
        praw : {
            domain : "www.jogunshop.com",
            type : "branduid",
            code : "27123",
            full : "www.jogunshop.com/shop/shopdetail.html?branduid=27123"
        },
        info : {
            sname : "조군샵",
            pname : "데이런온 레직기 트임 데님",
            ptype : "bottom",
            subtype : "긴바지"
        },
        size : [
            {
                name: "S",
                length : 103.5,
                waist : 39,
                crotch : 31,
                hips : 51,
                thigh : 29.5,
                hem : 20
                
            },
            {
                name: "M",
                length : 104.5,
                waist : 41,
                crotch : 32,
                hips : 52.5,
                thigh : 31.5,
                hem : 21
                
            },
            {
                name: "L",
                length : 105.5,
                waist : 43,
                crotch : 33,
                hips : 54,
                thigh : 33.5,
                hem : 22
                
            },
            {
                name: "XL",
                length : 106.5,
                waist : 45,
                crotch : 34,
                hips : 55.5,
                thigh : 35.5,
                hem : 23
                
            }
        ]
    }
    const db = __db.getConnection();
    db.collection(COLL_NAME).insertOne(query).toArray((err, result) => {
        if(err) return false;
        return {status : 200};
    });
} */
var MongoClient = require('mongodb').MongoClient;
const set = () => {
    console.log("start setting module")
    var query = { // 0
        status : 200, // 실제 서버에 들어갈때는 없애도됨.
        pcode : "PAAA0001",
        praw : {
            domain : "www.jogunshop.com",
            type : "branduid",
            code : "27123",
            full : "www.jogunshop.com/shop/shopdetail.html?branduid=27123"
        },
        info : {
            sname : "조군샵",
            pname : "데이런온 레직기 트임 데님",
            ptype : "bottom",
            subtype : "긴바지"
        },
        size : [
            {
                name: "S",
                length : 103.5,
                waist : 39,
                crotch : 31,
                hips : 51,
                thigh : 29.5,
                hem : 20
                
            },
            {
                name: "M",
                length : 104.5,
                waist : 41,
                crotch : 32,
                hips : 52.5,
                thigh : 31.5,
                hem : 21
                
            },
            {
                name: "L",
                length : 105.5,
                waist : 43,
                crotch : 33,
                hips : 54,
                thigh : 33.5,
                hem : 22
                
            },
            {
                name: "XL",
                length : 106.5,
                waist : 45,
                crotch : 34,
                hips : 55.5,
                thigh : 35.5,
                hem : 23
                
            }
        ]
    }
    const __url = 'mongodb://127.0.0.1:27017/';

    const db = __db.getConnection();
    MongoClient.connect(__url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sizelity");
        
        dbo.collection("product").insertOne(query, function(err, res) {
          if (err) throw err;
          if(res) console.log("create 1");
          else console.log("????");
          db.close();
        });
      });
}

module.exports = {
    set : set
}