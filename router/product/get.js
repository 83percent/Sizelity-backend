const { rejects } = require('assert');
const __db = require('../../lib/db/Mongo');

// Field
const DB_NAME = "Sizelity";
const COLL_NAME = "product";


const get = (query = {}) => {
    const db = __db.getConnection();
    const col = db.db(DB_NAME).collection(COLL_NAME);
    
    return new Promise((resolve, reject) => {
        col.find({}).toArray((err, result) => {
            console.log(result);
            resolve(result);
        });
    });
    db.db(`${DB_NAME}`).collection(`${COLL_NAME}`).find({}).toArray((err, result) => {
        if(err)  {
            console.log(err);
        };
        console.log(result);
        console.log("Find One");
        //return result;
    });
}
/* var MongoClient = require('mongodb').MongoClient;
const get = (query) => {
    const db = __db.getConnection();
    console.log("DataBase","background:green",db);
    return new Promise((resolve, response) => {
        const __url = 'mongodb://127.0.0.1:27017/';

        MongoClient.connect(__url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("sizelity");
            dbo.collection(`${COLL_NAME}`).find({}).toArray(function(err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            db.close();
            resolve(result);
            });
        });
    });
} */

// Waning !! 
const getAll = () => {
    console.log("inner getAll module");
    console.log("bottom");

    const db = __db.getConnection();
    db.collection(COLL_NAME).find({}).toArray((err, result) => {
        if(err) return [];
        return result;
    });
}

module.exports = {
    get : get,
    getAll : getAll
}