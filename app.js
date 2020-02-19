const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const initMiddleware = require('./src/middleWare/initMiddleware');
const startRoute = require('./src/servers/index');
const router = new Router();
// const router = new Router({prefix: '/users'}) // 生成路由前缀
setImmediate(function A() {
    console.log(1);
    setImmediate(function B(){console.log(2);});
  });
  
  setTimeout(function timeout() {
    console.log('TIMEOUT FIRED');
  }, 0);

app.use(bodyParser());
app.use(cors());

// for test
app.use(async function(ctx, next) {
    console.log('request body:', ctx.request.body);
    await next();
});

// jwt 验证
app.use(initMiddleware);
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
