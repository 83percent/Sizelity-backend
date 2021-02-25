const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017/';

class Mongo {
    /* constructor() {

    } */
    connect() { 
        MongoClient.connect(url, (err,db) => {
            if(err) throw err;
            console.log("DataBase Created!");
            db.close();
        })
    }
}
module.exports = Mongo;