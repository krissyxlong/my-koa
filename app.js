const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const jwtKoa = require('koa-jwt');
const fs = require('fs');
const path = require('path');
const traceMiddleware = require('./src/middleWare/traceMiddleware');
const initMiddleware = require('./src/middleWare/initMiddleware');
const startRoute = require('./src/servers/index');
const vert = fs.readFileSync(path.resolve(__dirname, './src/config/publicKey'));
const router = new Router();
// const router = new Router({prefix: '/users'}) // 生成路由前缀

app.use(bodyParser());
app.use(cors());

// for test
app.use(async function(ctx, next) {
    // test body
    console.log('request body:', ctx.request.body);
    await next();
});

// jwt 验证
app
    .use(initMiddleware)
    .use(jwtKoa({secret: vert}).unless({
        path: [/^\/login/] // 数组中的路径不需要通过jwt验证
    }))

// start route
startRoute(router);

app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(traceMiddleware())
    .use(async(ctx, next) => { // for test
        console.log('enddddddddddddd');
    }); 

app.listen(8080);
