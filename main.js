const { request, response } = require('express');
const express = require('express');
const app = express();
const port = 3001;

app.get('/',(request, response) => {
    response.send('Hello World!!!AAA');
});
app.get('/test', (request, response) => {
    response.send("Test Page!");
});
app.get('/wrong', (request, response) => {
    response.send("Wrong!");
});

app.listen(port, () => {
    console.log("Get Start Application.");
});