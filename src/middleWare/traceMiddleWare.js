const {
    Tracer,
    BatchRecorder,
    jsonEncoder: {JSON_V2}
} = require('zipkin');
const CLSContext = require('zipkin-context-cls');
const { HttpLogger } = require('zipkin-transport-http');
const zipkinMiddleware = require('./zipkinMiddle');

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


module.exports = function traceMiddleWare() {
    // return async function traceMiddleWareInner(ctx, next) {
    //     console.log('ctxctxctx:', ctx);
    //     await next();
    // }
    return zipkinMiddleware({ 
        tracer, 
        serviceName: 'kuma-node' // name of this application 
    })
    // await next();
}