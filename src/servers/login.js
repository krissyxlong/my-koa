const jwt = require('jsonwebtoken')
const fetch = require('../lib/fetch');
const { client_id, client_secret, grant_type, login_system, tokoenSecret } = require('../config/jwtConfig');

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
            res = await fetch('http://127.0.0.1:3002', {
                method: 'POST',
                body: JSON.stringify(loginInfo),
                headers: { 
                    'Authorization': 'Basic ' + baseString,
                    'Content-Type': 'application/json'
                },
            })
            console.log('resssssssssss', res);
        } catch(err) {
            console.error('get token api error::', err);
        }
        console.log('4');

        const token = jwt.sign(loginInfo, tokoenSecret, {expiresIn: '1h'})
        // 返回 token
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
    // await next()
}
