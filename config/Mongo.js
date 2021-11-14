const mongoose = require('mongoose');
const path = require('path');
const ENV_PATH = path.resolve(__dirname, "../.env");
require('dotenv').config({path : ENV_PATH});
// Atlas
const __url = process.env.DB_URL;

mongoose.connect(
    __url, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
); // Connect Mongoose

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Mongoose - MongoDB Connection Access Success.");
});

module.exports = mongoose;