const Login = require('./login');
const Test = require('./test');
const Test1 = require('./test1');

module.exports = (router) => {
    router
        .get('/login', Login)
        .get('/test', Test)
        .get('/test1', Test1)
}
