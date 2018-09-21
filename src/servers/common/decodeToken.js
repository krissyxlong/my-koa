const jwt = require('jsonwebtoken');
const jwtKoa = require('koa-jwt');
const util = require('util');
const verify = util.promisify(jwt.verify);
const { tokoenSecret } = require('../../config/jwtConfig');

module.exports = async (token) => {
    let payload
    try {
        payload = await verify(token.split(' ')[1], tokoenSecret);
    } catch(err) {
        console.error('decode token err::', err);
    }
    return payload
}