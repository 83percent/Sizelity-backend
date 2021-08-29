// Module
const express = require('express');
const cors = require('cors');

const passport = require('passport');

const cookieParser = require('cookie-parser');

//const session = require('express-session');
//const cookieSession = require('cookie-session');

const __Mongoose = require('./config/Mongo');

// Router Component
const ProductRouter = require('./router/ProductRouter');
const UserRouter = require('./router/UserRouter');
const EventRouter = require('./router/EventRouter');
const AfterRouter = require('./router/AfterRouter');
const AuthRouter = require('./router/AuthRouter');

// Field
const PORT = 3001;

/* ================================
            Server start
================================ */
const server = express();
server.use(passport.initialize());

server.use(express.static('public'));
server.use(cookieParser({secret: 'rererere'}));


server.use(cors({
    //origin: 'https://www.sizelity.com',
    origin: 'http://localhost:3000',
    //origin: true,
    //origin : '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH','OPTIONS'],
    credentials: true
}));

server.use(express.json());
server.options('/*', (req, res) => {
    //res.header("Access-Control-Allow-Origin", "https://www.sizelity.com");
    res.header("Access-Control-Allow-Origin", "localhost:3000");
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


server.use('/auth', AuthRouter);
server.use('/after', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    if(req.isAuthenticated()) next();
    else res.sendStatus(401);
}, AfterRouter); // /after

server.use('/product', ProductRouter); // /product

server.use('/user', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    if(req.isAuthenticated()) next();
    else {res.sendStatus(401);}
},UserRouter); // /user

server.use('/event', EventRouter); // /event


server.listen(PORT, () => {
    console.log(" Server Start : ",PORT);
});
