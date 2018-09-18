const fetch = require('node-fetch');
// const {Tracer} = require('zipkin');
// const wrapFetch = require('zipkin-instrumentation-fetch');

// const localServiceName = 'service-test'; // name of this application
// const tracer = new Tracer({ctxImpl:1, recorder:1, localServiceName});

// const remoteServiceName = 'youtube';
// const zipkinFetch = wrapFetch(fetch, {tracer, remoteServiceName});


module.exports = async (url, options={}) => {
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