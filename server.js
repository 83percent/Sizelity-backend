const __http = require('http');
const __url = require('url');

const PORT = 3001;


const server = __http.createServer((request, response) => {
    const url = __url.parse(request.url, true);
    const path = url.path;
    console.log(path);

    switch(path) {
        case "/" : {
            console.log("index")
            break;
        }
        default : {
            response.writeHead(404);
            response.end("404. Not Found!!!!!");
        }
    }
});

server.listen(PORT);