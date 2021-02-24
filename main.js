const http = require('http');
const url = require("url");
const fs = require('fs');

const app = http.createServer((request, response) => {
    let _url = request.url;
    let f = null;
    const queryData = url.parse(_url, true).query;
    if(_url === '/'){
        f = '/index.html';
    } else {
        f = '/wrong.html';
    }
    if(_url === '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    console.log(__dirname);
    response.end(fs.readFileSync(__dirname + f));
});
app.listen(3001);