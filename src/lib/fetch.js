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
    endpoint: 'http://localhost:3005/api/v2/spans',
    jsonEncoder: JSON_V2
    })
}),
localServiceName: 'kuma-node' // name of this application
});

// now use tracer to construct instrumentation! For example, fetch
const wrapFetch = require('zipkin-instrumentation-fetch');

const remoteServiceName = 'kuma-node';
const zipkinFetch = wrapFetch(fetch, {tracer, remoteServiceName});

module.exports = async(url, options={}) => {
    try {
        let res = await fetch(url, {
            ...options,
            timeout: 60000
        })
        res = await res.text();
        return res
    } catch(e) {
        console.log('fetch err:', e);
        throw new Error(e)
    }
}
