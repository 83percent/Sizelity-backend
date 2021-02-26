// Module
const __http = require('http');
const __url = require('url');
const __Mongo = require('./lib/db/Mongo');

const __routeProduct = require('./router/product/Product');
const __routeUser = require('./router/user/get');

// Field
const PORT = 3001;

/* ================================
    Mongo DB Ready for Pooling
================================ */
__Mongo.establishConnection();




/* ================================
            Server start
================================ */
const server = __http.createServer((request, response) => {
    const url = __url.parse(request.url, true);
    let path = url.path.split("/");

    switch(path[1]) {
        case "" : {
            console.log("index")
            response.writeHead(200);
            response.end(path[1]);
            break;
        }
        case "product" : {
            __routeProduct.router(path[2], request, response);
            break;
        }
        case "usr" : {
            console.log("product");
            response.writeHead(200);
            response.end(path[1]);
            break;
        }
        default : {
            response.writeHead(404);
            response.end("404. Not Found!!!!!");
        }
    }
});

server.listen(PORT);