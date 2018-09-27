const decodeToken = require('./common/decodeToken');
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
            res = await ctx.fetch('http://192.168.31.212:8804/oauth/token?username=user&password=user&login_system=FUM&grant_type=kuma_user', {
            // res = await fetch('http://127.0.0.1:3002', {
                method: 'POST',
                body: JSON.stringify(loginInfo),
                headers: { 
                    'Authorization': 'Basic ' + baseString,
                    // 'Content-Type': 'application/json'
                },
            })
            console.log('token res', res);
            let tokenInfo = JSON.parse(res);
            if (tokenInfo && tokenInfo.access_token) { // token 存在
                const token = tokenInfo.access_token;
                const payload = await decodeToken(token);
                if (payload) { // 有效token
                    ctx.body = tokenInfo
                } else {
                    ctx.status = 401;
                    ctx.body = {
                        message: 'token expired',
                    }
                }
                
            } else {
                ctx.status = 500;
                ctx.body = {
                    message: 'get token fail'
                }
            }
        } catch(err) {
            console.error('get token api error::', err);
            ctx.status = 500;
            ctx.body = {
                message: err.message
            }
        }
    } else {
        ctx.status = 400;
        ctx.body = {
            message: '参数缺失',
        }
    }
    await next()
}
