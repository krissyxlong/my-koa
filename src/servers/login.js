module.exports = async(ctx, next) => {
    ctx.status = 200;
    ctx.body = {
        code: 200,
        token: 'heheheheda'
    }
}
