const jwt = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jwt.verify);

const fetch = require('../lib/fetch');
const { client_id, client_secret, grant_type, login_system, publicKey, tokenObj } = require('../config/jwtConfig');

module.exports = async (ctx, next) => {
    const { username='user', password='user' } = ctx.request.body
    // console.log('userInfo:', username, password);
    if(username && password) {
        const loginInfo = {
            username,
            password,
            grant_type,
            login_system
        }
        // todo 请求 token
        const baseString = Buffer.from(client_id + ':' + client_secret).toString('base64');
        // console.log('baseString:', baseString);

        let res;
        try {
            res = await fetch('http://192.168.31.212:8804/oauth/token?username=user&password=user&login_system=FUM&grant_type=kuma_user', {
            // res = await fetch('http://127.0.0.1:3002', {
                method: 'POST',
                body: JSON.stringify(loginInfo),
                headers: { 
                    'Authorization': 'Basic ' + baseString,
                    'Content-Type': 'application/json'
                },
            })

            let testToken = jwt.sign(loginInfo, publicKey, { expiresIn: '2h' });
            console.log('testToken:', testToken);

            let tokenObj = JSON.parse(res);
            if (tokenObj && tokenObj.access_token) {
                // 返回 token
                ctx.body = {
                    message: 'get token success',
                    code: 200,
                    token: tokenObj.access_token
                }
            } else {
                ctx.body = {
                    message: 'get token fail',
                    code: 403
                }
            }
        } catch(err) {
            console.error('get token api error::', err);
            ctx.status = 408;
            ctx.body = {
                message: err.message,
                code: 500
            }
        }
    } else {
        ctx.status = 500;
        ctx.body = {
            message: '参数缺失',
            code: 500
        }
    }
    await next()
}
