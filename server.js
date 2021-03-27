// Module
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const __Mongoose = require('./lib/db/Mongo');


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


server.use(express.static('public'));
server.use(cookieParser({secret: 'rererere'}));
server.use(cookieSession({
    name: 'session',
    keys: ['rererere']
}));

server.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true
}));
server.use(express.json());
server.use(session({
    resave: false,
    saveUninitialized : false,
    cookie: {
        secure: false
    },
    secret: 'rererere'
}));

//server.use(cookieSession());
server.use(passport.initialize());
server.use(passport.session());
server.options('/*', (req, res) => {
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Header", "X-Requested-With");
    //res.header("Access-Control-Allow-Methods","GET, PUT, POST, DELETE, OPTIONS");

    res.send();
});

server.use('/product', Product);
server.use('/su', ShopUser);
server.use('/s', Shop);
server.use('/user', (req, res, next) => {
    if(req.isAuthenticated()) next();
    else {
        res.status(401).send({message: "Can't access user"});
    }
},ClientUser);
server.use('/event', EventRouter);



server.listen(PORT, () => {
    console.log(" Start Server.js PORT : ",PORT);
});
