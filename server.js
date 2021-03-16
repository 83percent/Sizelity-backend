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
const Product = require('./router/Product');
const Shop = require('./router/Shop');
const ShopUser = require('./router/Shop_User');
const ClientUser = require('./router/Client_User');
const EventRouter = require('./router/Event_Router');

server.use(express.json());
server.use(cors());

server.use('/product', Product);
server.use('/su', ShopUser);
server.use('/s', Shop);
server.use('/user', ClientUser);
server.use('/event', EventRouter);

server.listen(PORT, () => {
    console.log(" Start Server.js PORT : ",PORT);
});