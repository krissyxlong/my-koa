const querystring = require('querystring');
const fetch = require('../../lib/fetch');
module.exports = async(ctx, next) => {
    
    let res;
    try {
        res = await fetch('http://127.0.0.1:3001/api/v2/spans', {
            method: 'POST',
            body: JSON.stringify({
                a: 1
            }),
            headers: { 'Content-Type': 'application/json' },
        })
    } catch(e) {
        console.error('err:', e);
    }
    console.log(1111111111);
    // console.log('hehehda', res);

    ctx.body = {
        page: 'hello 6666666',
        body: ctx.request.body
    }
  }