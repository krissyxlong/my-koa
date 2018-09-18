const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const index = require('./src/servers/index/s1');

const {
  Tracer,
  BatchRecorder,
  jsonEncoder: {JSON_V2}
} = require('zipkin');
const zipkinMiddleware = require('./src/middleWare/zipkinMiddle');
const CLSContext = require('zipkin-context-cls');
const {HttpLogger} = require('zipkin-transport-http');

// Setup the tracer to use http and implicit trace context
const tracer = new Tracer({
  ctxImpl: new CLSContext('zipkin'),
  recorder: new BatchRecorder({
    logger: new HttpLogger({
      endpoint: 'http://localhost:3005/api/v2/spans',
      jsonEncoder: JSON_V2
    })
  }),
  localServiceName: 'kuma-node' // name of this application
});
  

app.use(zipkinMiddleware({ 
  tracer, 
  serviceName: 'kuma-node' // name of this application 
})); 


// const router = new Router({prefix: '/users'}) // 生成路由前缀
app.use(bodyParser());
app.use(cors());

app.use(async (ctx, next) => {
  console.log('request body:', ctx.request.body);
  await next();
  // const rt = ctx.response.get('X-Response-Time');
  // console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

router
  .get('/test', test)
  .all('/', index)

  
  
// 重定向
  async function test(ctx, next) {
    // const routeR = parseRoute(ctx.url)
    ctx.body = 'in test page'
    // ctx.redirect('/'); // 重定向设置
    // ctx.status = 301;
  }
  // x-response-time
  // app.use(async (ctx, next) => {
  //   const start = Date.now();
  //   await next();
  //   const ms = Date.now() - start;
  //   ctx.set('X-Response-Time', `${ms}ms`);
  // });
  
  // response
  
  // app.use(async ctx => {
  //   ctx.status = 404;
  //   ctx.message = 'not found'
  //   ctx.body = {};
  // });


app
  .use(router.routes())
  .use(router.allowedMethods())

    // 执行自定义错误处理逻辑，如集中式日志记录
// app.on('error', (err, ctx)=> {
//   ctx.status = 404;
//   ctx.message = 'not found'
//   log.error('server error', err, ctx)
// });

app.listen(3005);
