const fetch = require('../lib/fetch');

module.exports = async function initMiddleware(ctx, next) {
    // set global fetch
    ctx.fetch = fetch;

    await next();
}
