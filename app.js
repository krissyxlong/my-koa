const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const jwtKoa = require('koa-jwt');
const fs = require('fs');
const path = require('path');
const Login = require('./src/servers/login');
const Test = require('./src/servers/test');
const Test1 = require('./src/servers/index/s1');
// const vert = fs.readFileSync('publicKey');
// console.log('__dirname:', __dirname);
const vert = fs.readFileSync(path.resolve(__dirname, './src/config/publicKey'));


const router = new Router();
// const router = new Router({prefix: '/users'}) // 生成路由前缀
app.use(bodyParser());
app.use(cors());

app.use(async function(ctx, next) {
  // console.log('headers:', ctx.req.get('Authorization'));
  console.log('request body:', ctx.request.body);
  await next();
});
// jwt 验证
app.use(jwtKoa({secret: vert}).unless({
    path: [/^\/login/] // 数组中的路径不需要通过jwt验证
}))

router
    .post('/login', Login)
    .get('/test', Test)
    .get('/test1', Test1)

app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(async(ctx, next) => {
        console.log('enddddddddddddd');
    })

app.listen(3005);
