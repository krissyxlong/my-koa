const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const jwtKoa = require('koa-jwt');
const fs = require('fs');
const path = require('path');
const traceMiddleWare = require('./src/middleWare/traceMiddleWare');
const startRoute = require('./src/servers/index');
const fetch = require('./src/lib/fetch');
const decodeToken = require('./src/servers/common/decodeToken');
const vert = fs.readFileSync(path.resolve(__dirname, './src/config/publicKey'));
const router = new Router();
// const router = new Router({prefix: '/users'}) // 生成路由前缀

app.use(bodyParser());
app.use(cors());

// for test
app.use(async function(ctx, next) {
    // test body
    console.log('request body:', ctx.request.body);

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
  });

// jwt 验证
app.use(jwtKoa({secret: vert}).unless({
    path: [/^\/login/] // 数组中的路径不需要通过jwt验证
}))

// start route
startRoute(router);

app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(traceMiddleWare())
    .use(async(ctx, next) => { // for test
        console.log('enddddddddddddd');
    }); 

app.listen(3005);
