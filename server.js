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
const ADRouter = require('./router/ADRouter');
const AfterRouter = require('./router/AfterRouter');
const AuthRouter = require('./router/AuthRouter');
const NoticeRouter = require('./router/NoticeRouter');
const ReservationRouter = require('./router/ReservationRouter');
const ImprovementRouter = require('./router/ImprovementRouter');
const CompareRouter = require('./router/CompareRouter');

const copsOption = {
    //origin : ['https://www.sizelity.com','https://official.sizelity.com'],
    origin: 'http://192.168.11.2:3000',
    credentials :true
}

/* ================================
            Server start
================================ */
const server = express();   
server.use(passport.initialize());

server.use(express.static('public'));
server.use(cookieParser({secret: 'rererere'}));

server.use(cors(copsOption));
server.use(express.json());

server.get('/healthCheck', (req, res) => {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("Health Check Page");
    res.end();
})


server.use('/auth', AuthRouter);
server.use('/reservation', ReservationRouter);
server.use('/after', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    if(req.isAuthenticated()) next();
    else res.status(401).send({error : "로그인 후 이용가능 합니다"});
}, AfterRouter); // /after
server.use('/product', ProductRouter); // /product

server.use('/user', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    if(req.isAuthenticated()) next();
    else {res.status(401).send({error : "로그인 후 이용가능 합니다"});}
},UserRouter); // /user
server.use('/compare', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    if(req.isAuthenticated()) next();
    else {res.status(401).send({error : "로그인 후 이용가능 합니다"});}
}, CompareRouter);

server.use('/notice', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    if(req.isAuthenticated()) next();
    else {res.status(401).send({error : "로그인 후 이용가능 합니다"});}
}, NoticeRouter);
server.use('/improvement', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    if(req.isAuthenticated()) next();
    else {res.status(401).send({error : "로그인 후 이용가능 합니다"});}
}, ImprovementRouter);
server.use('/ad', ADRouter);

const port = 3001;

server.listen(port);
console.info(`============ SERVER START :  on ${port} =================`)