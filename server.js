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
const ProductRouter = require('./router/ProductRouter');
const ClientUser = require('./router/Client_User');
const ClientLogin = require('./router/Client_Login');
const EventRouter = require('./router/Event_Router');


server.use(express.static('public'));
server.use(cookieParser({secret: 'rererere'}));
server.use(cookieSession({
    name: 'session',
    keys: ['rererere']
}));

server.use(cors({
    //origin: 'https://www.sizelity.com',
    origin: '*',
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
server.use('/product', ProductRouter);
//server.use('/su', ShopUser);
//server.use('/s', Shop);
server.use('/user', (req, res, next) => {
    console.log("로그인 여부 : ", req.isAuthenticated())
    if(req.isAuthenticated()) next();
    else {
        res.sendStatus(401);
    }
},ClientUser);
server.use('/login', ClientLogin);
server.use('/event', EventRouter);


server.listen(PORT, () => {
    console.log(" Start Server.js PORT : ",PORT);
});
