// Module
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const __Mongoose = require('./config/Mongo');

// Router Component
const ProductRouter = require('./router/ProductRouter');
const UserRouter = require('./router/UserRouter');
const AccountRouter = require('./router/AccountRouter');
const EventRouter = require('./router/EventRouter');
const AfterRouter = require('./router/AfterRouter');

// Field
const PORT = 3001;

/* ================================
            Server start
================================ */
const server = express();

server.use(express.static('public'));
server.use(cookieParser({secret: 'rererere'}));
server.use(cookieSession({
    name: 'session',
    keys: ['rererere']
}));    

server.use(cors({
    //origin: 'https://www.sizelity.com',
    origin: 'http://localhost:3000',
    //origin : '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH','OPTIONS'],
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
    //res.header("Access-Control-Allow-Origin", "https://www.sizelity.com");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Header", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", 'true');

    res.sendStatus(200);
});

// server.use('path', corsCheckFunc(), (res,req,next) => {}); 이렇게 사용하는게 더 좋아보임

server.get('/healthCheck', (req, res) => {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("Health Check Page");
    res.end();
})

server.use('/after', (req, res, next) => {
    if(req.isAuthenticated()) next();
    else res.sendStatus(401);
}, AfterRouter); // /after

server.use('/product', ProductRouter); // /product

server.use('/user', (req, res, next) => {
    if(req.isAuthenticated()) next();
    else {res.sendStatus(401);}
},UserRouter); // /user


server.use('/account', AccountRouter); // /acount

server.use('/event', EventRouter); // /event


server.listen(PORT, () => {
    console.log(" Start Server.js PORT : ",PORT);
});
