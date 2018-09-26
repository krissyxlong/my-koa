const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const jwtKoa = require('koa-jwt');
const fs = require('fs');
const path = require('path');
const {
    Tracer,
    BatchRecorder,
    jsonEncoder: {JSON_V2}
} = require('zipkin');
const zipkinMiddleware = require('./src/middleWare/zipkinMiddle');
const CLSContext = require('zipkin-context-cls');
const {HttpLogger} = require('zipkin-transport-http');
const startRoute = require('./src/servers/index');
// const vert = fs.readFileSync('publicKey');
const vert = fs.readFileSync(path.resolve(__dirname, './src/config/publicKey'));
const router = new Router();
// const router = new Router({prefix: '/users'}) // 生成路由前缀

// Setup the tracer to use http and implicit trace context
const tracer = new Tracer({
    ctxImpl: new CLSContext('zipkin'),
    recorder: new BatchRecorder({
        logger: new HttpLogger({
        endpoint: 'http://localhost:3005',
        jsonEncoder: JSON_V2
        })
    }),
    localServiceName: 'kuma-node' // name of this application
});

app.use(bodyParser());
app.use(cors());

// for test
app.use(async function(ctx, next) {
    // console.log('headers:', ctx.req.get('Authorization'));
    console.log('request body:', ctx.request.body);
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
    .use(zipkinMiddleware({ 
        tracer, 
        serviceName: 'kuma-node' // name of this application 
    }))
    .use(async(ctx, next) => { // for test
        console.log('enddddddddddddd');
    }); 

app.listen(3005);
