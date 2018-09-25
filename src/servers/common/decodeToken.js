const jwt = require('jsonwebtoken');
const jwtKoa = require('koa-jwt');
const util = require('util');
const verify = util.promisify(jwt.verify);
const { publicKey } = require('../../config/jwtConfig');

module.exports = async (token) => {
    let payload
    try {
        const innerToken = token.split(' ')[1]
        payload = await verify(innerToken, publicKey, {
            algorithms: ['RS256']
        });
        console.log('payload ok:', payload);
    } catch(err) {
        console.error('decode token err::', err);
    }
    return payload
}