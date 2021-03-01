// Module
const express = require('express');
const __Mongoose = require('./lib/db/Mongo');
const cors = require('cors');

// Field
const PORT = 3001;

/* ================================
            Server start
================================ */
const server = express();

// Router Component
const P_GETTER = require('./router/Product');
//const P_SETTER = require('./router/product/P_SETTER');

server.use(express.json());
server.use(cors());
server.use('/product', P_GETTER);

server.listen(PORT, () => {
    console.log(" Start Server.js PORT : ",PORT);
});