const {
    option: {Some, None},
    Instrumentation
  } = require('zipkin');
  const url = require('url');
  
  function formatRequestUrl(req) {
    const parsed = url.parse(req.origin);
    return url.format({
      protocol: req.protocol,
      host: req.get('host'),
      pathname: parsed.pathname,
      search: parsed.search
    });
  }
  
  module.exports = function expressMiddleware({tracer, serviceName, port = 0}) {
    const instrumentation = new Instrumentation.HttpServer({tracer, serviceName, port});
    return function zipkinExpressMiddleware(ctx, next) {
        let req = ctx.req;
        let res = ctx.res;
      tracer.scoped(() => {
        function readHeader(header) {
          const val = ctx.request.get(header);
          if (val != null) {
            return new Some(val);
          } else {
            return None;
          }
        }
  
        const id =
          instrumentation.recordRequest(req.method, formatRequestUrl(ctx), readHeader);

          console.log('traceId:', id);
  
        res.on('finish', () => {
          tracer.scoped(() => {
            instrumentation.recordResponse(id, res.statusCode);
          });
        });
  
        await next();
      });
    };
  };
  