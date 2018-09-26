const jwt = require('jsonwebtoken');
const fs = require('fs');
const util = require('util');
const path = require('path');
const verify = util.promisify(jwt.verify);
// const vert = fs.readFileSync('publicKey');
const vert = fs.readFileSync(path.resolve(__dirname, '../../config/publicKey'));

module.exports = async (token) => {
    let payload
    if (!token) {
        return null;
    }
    try {
        let innerToken;
        if (token.indexOf(' ') < 0) {
            innerToken = token;
        } else {
            innerToken = token.split(' ')[1];
        }
        payload = await verify(innerToken, vert, {
            algorithms: ['RS256']
        });
        console.log('get payload ok:', payload);
    } catch(err) {
        console.error('decode token err::', err);
    }
    return payload
}