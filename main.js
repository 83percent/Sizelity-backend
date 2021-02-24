const { request, response } = require('express');
const express = require('express');
const app = express();
const port = 3001;

app.get('/',(request, response) => {
    response.send('Hello World!!!AAA');
}).get('/test', (request, response) => {
    response.send("Test Page!");
});

app.listen(port);