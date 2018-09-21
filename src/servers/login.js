const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const util = require('util')
const verify = util.promisify(jwt.verify)

const { client_id, client_secret, grant_type, login_system } = require('../config/jwtConfig');

module.exports = async (ctx, next) => {
    const user = ctx.request.body
    if(user && user.userName && user.passWord) {
        const loginInfo = {
            ...user,
            grant_type,
            login_system
        }
        const token = jwt.sign(loginInfo, secret, {expiresIn: '1h'})  //token签名 有效期为1小时
        ctx.body = {
            message: '获取token成功',
            code: 200,
            token
        }
    } else {
        ctx.status = 500;
        ctx.body = {
            message: '参数缺失',
            code: 500
        }
    }
}
