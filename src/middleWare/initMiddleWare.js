const decodeToken = require('../servers/common/decodeToken');
const fetch = require('../lib/fetch');

module.exports = async function initMiddleware(ctx, next) {
    
    // set global userInfo
    const token = ctx.header.authorization;
    console.log('header token:', token);
    if (token) {
        let userInfo = await decodeToken(token, next);
        ctx.userInfo = userInfo;
    }
    
    // set global fetch
    ctx.fetch = fetch;

    await next();
}