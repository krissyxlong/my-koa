module.exports = async (ctx, next) => {
    const token = ctx.header.authorization  // 获取jwt
    let payload

        // ctx.body = {
        //     message: payload,
        //     code: 200
        // }
        // next()
    if (token) {
        payload = await verify(token.split(' ')[1], secret)  // // 解密，获取payload
        ctx.body = {
          a: 1
        }
    } else {
        ctx.body = {
            message: 'token 错误',
            code: -1
        }
    }
}