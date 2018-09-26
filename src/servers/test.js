const decodeToken = require('./common/decodeToken');

module.exports = async (ctx, next) => {
    const token = ctx.header.authorization  // 获取jwt
    console.log('header token:', token);

    let payload = await decodeToken(token);

    if (payload) {
        ctx.body = {
            code: 200,
            payload: payload
        }
    } else {
        ctx.body = {
            code: 500,
            msg: 'token 解码错误'
        }
    }
    await next()
}
