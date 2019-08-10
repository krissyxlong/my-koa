const waiting = (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(1111);
        }, time);
        // process.nextTick(resolve);
    });
};

module.exports = async(ctx, next) => {
    const res = await waiting(5000);
    console.log('res:', res);
    // while (true) {
    //     console.log('hehe');
    // }
    ctx.body = {
        page: 'hello 6666666'
    }
  }