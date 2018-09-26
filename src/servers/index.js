const Login = require('./login');
const Test = require('./test');
const Test1 = require('./test/s1');

module.exports = (router) => {
    router
        .post('/login', Login)
        .get('/test', Test)
        .get('/test1', Test1)
}
