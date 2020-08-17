const Koa = require('koa');
const app = new Koa();
// const cors = require('koa2-cors');
// const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
// const initMiddleware = require('./src/middleWare/initMiddleware');
const startRoute = require('./src/servers/index');
const TestAst = require('./src/servers/ast');
const router = new Router();
const serve = require('koa-static');
// const router = new Router({prefix: '/users'}) // 生成路由前缀

// app.use(bodyParser());
// app.use(cors());

// for test
// app.use(serve('.'))
// .use(async(ctx, next) => { // for test
//     console.log('in api');
// });
// app.use(serve(__dirname + '/static'));

TestAst();
// jwt 验证
// app.use(initMiddleware);
startRoute(router);

app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(async(ctx, next) => { // for test
        console.log('enddddddddddddd');
    });

app.listen(8080, () => {
    console.log('-----start success');
});
