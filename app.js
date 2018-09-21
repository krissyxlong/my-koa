const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const jwtKoa = require('koa-jwt')
const Login = require('./src/servers/login');
const Test = require('./src/servers/test');
const secret = 'jwt demo'

const router = new Router();
// const router = new Router({prefix: '/users'}) // 生成路由前缀
app.use(bodyParser());
app.use(cors());

app.use(async function(ctx, next) {
  // console.log('headers:', ctx.req.get('Authorization'));
  console.log('request body:', ctx.request.body);
  next();
});
// jwt 验证
app.use(jwtKoa({secret}).unless({
    path: [/^\/login/] //数组中的路径不需要通过jwt验证
}))

router
    .post('/login', Login)
    .get('/test', Test)

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3005);
