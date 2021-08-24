const mongoose = require('mongoose');
const path = require('path');
const ENV_PATH = path.resolve(__dirname, "../.env");
require('dotenv').config({path : ENV_PATH});
// local
const __url = process.env.DB_LOCAL;
// Atlas
//const __url = process.env.DB_URL;

mongoose.connect(
    __url, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
); // Connect Mongoose

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Mongoose - MongoDB Connection Access Success.");
});

module.exports = mongoose;