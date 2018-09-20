const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const model = require('koa-oauth-server/node_modules/oauth2-server/examples/memory/model');
const index = require('./src/servers/index/s1');
const login = require('./src/servers/login');
const oauthserver = require('koa-oauth-server')

const router = new Router();
// const router = new Router({prefix: '/users'}) // 生成路由前缀
app.use(bodyParser());
app.use(cors());

app.oauth = oauthserver({
  model: model,
  grants: ['password'],
  debug: true
});

app.use(app.oauth.authorise());

app.use(async function(ctx, next) {
  // console.log('headers:', ctx.request.header);
  console.log('headers:', ctx.req.get('Authorization'));
  this.body = 'Secret area';
  this.status = 200;
  next();
});
 

app.use(async (ctx, next) => {
  console.log('request body:', ctx.request.body);
  await next();
});

router
  .post('/login', login)
  // .get('/test', test)
  .all('/', index)

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3005);
