const path = require('path');
const ENV_PATH = path.resolve(__dirname, "../.env");
require('dotenv').config({path : ENV_PATH});

const jwt = require('jsonwebtoken');

const secret_key = process.env.JWT_SECRET_KEY;
const options = {
    expiresIn : '365d',
    issuer : 'account.sizelity.com',
    audience: 'sizelity.com',
}


function createJWT({id, provider}) {
    return new Promise((resolve, reject) => {
        try {
            jwt.sign({
                id, provider
            }, secret_key, options,
            function(err, token) {
                if(err) {
                    resolve(null);
                    console.error(err);
                } 
                else resolve(token)
            });
        } catch(error) {
            reject(error);
        }
    })
}

module.exports = {
    createJWT
}