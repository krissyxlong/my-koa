const fetch = require('node-fetch');
const {
    Tracer,
    BatchRecorder,
    jsonEncoder: {JSON_V2}
  } = require('zipkin');
  const CLSContext = require('zipkin-context-cls');
  const {HttpLogger} = require('zipkin-transport-http');
  
  // Setup the tracer to use http and implicit trace context
  const tracer = new Tracer({
    ctxImpl: new CLSContext('zipkin'),
    recorder: new BatchRecorder({
      logger: new HttpLogger({
        endpoint: 'http://localhost:3005',
        jsonEncoder: JSON_V2
      })
    }),
    localServiceName: 'service-a' // name of this application
  });
  
  // now use tracer to construct instrumentation! For example, fetch
  const wrapFetch = require('zipkin-instrumentation-fetch');
  
  const remoteServiceName = 'youtube';
  const zipkinFetch = wrapFetch(fetch, {tracer, remoteServiceName});


module.exports = async (url, options={}) => {
    console.log('in fetch');
    if (!url) {
        return new Error('missing paramter url')
    }
    const res = await fetch(url, {
        ...options
    }).then(resonse => {
        return resonse.text();
    })
    return res;
}