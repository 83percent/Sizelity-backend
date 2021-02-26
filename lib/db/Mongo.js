const { MongoClient } = require('mongodb');

// Field
// const __url = 'mongodb://127.0.0.1:27017/';
const __url = 'mongodb://127.0.0.1:27017/?poolSize=20&writeConcern=majority';
const __poolSize = 10;

const client = new MongoClient(__url)

const run = async () => {
    try {
        await client.connect();
        
        await client.db("sizelity").command({ping : 1});
        console.log(" Connected successfully to server!");
    } catch(error) {
        console.log(error);
    } finally {
        await client.close();
    }
}
var connection=[];
// Create the database connection
const establishConnection = (callback) => {
    MongoClient.connect(__url, { poolSize: __poolSize },(err, db) => {
        
            connection = db;
            if(typeof callback === 'function' && callback) callback(connection);
        
    })       
}
const getConnection = () => { return connection; }



module.exports = {
    run : run,
    establishConnection : establishConnection,
    getConnection : getConnection
}