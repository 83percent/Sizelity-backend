const __set = require('./set');
const __get = require('./get');

// Field
let RESULT = {status:400};
const RES_OPTION = {
    'Content-Type': 'application/json'
}

const router = async (path, request, response) => {
    console.log(path)
    try {
        if(!path || !request || !response) throw error;

        const result = await getResult(path);
        console.log("Result = ", result);

        if(result !== null) response.writeHead(400, RES_OPTION); 
        else response.writeHead(200, RES_OPTION);
        response.end(result);

    } catch(error) {
        if(!response) {
            response.writeHead(502);
            response.end({"status" : "502"});
        }
    }
    
}

const getResult = async (path) => {
    let result = RESULT;
    switch(path) {
        case 'get' : {
            result = await __get.get();
            break;
        }
        case 'set' : {
            result = await __set.set();
            break;
        }
        default : {
            break;
        }
    }
    return JSON.stringify(result);
}
exports.router = router;