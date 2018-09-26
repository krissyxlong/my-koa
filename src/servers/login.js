const decodeToken = require('./common/decodeToken');
const fetch = require('../lib/fetch');
const { client_id, client_secret, grant_type, login_system } = require('../config/jwtConfig');

module.exports = async (ctx, next) => {
    const { username='user', password='user' } = ctx.request.body
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

            let tokenInfo = JSON.parse(res);
            if (tokenInfo && tokenInfo.access_token) { // token 存在
                // 返回 token]
                const token = tokenInfo.access_token;
                const payload = await decodeToken(token);
                if (payload) { // 有效token
                    ctx.body = {
                        message: 'get token success',
                        code: 200,
                        tokenInfo
                    }
                } else {
                    ctx.status = '401';
                    ctx.body = {
                        message: 'token expired',
                    }
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
