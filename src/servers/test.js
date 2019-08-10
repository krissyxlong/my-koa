const waiting = (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('test api');
        }, time);
        // process.nextTick(resolve);
    });
};

module.exports = async(ctx, next) => {
    const res = await waiting(2000);
    ctx.body = res;
  }