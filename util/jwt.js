const jwt = require('koa-jwt');

const { JWT_SECRET } = require('../config/');
const auth = jwt({
  secret: JWT_SECRET,
  cookie: 'token', // 从 cookie 中获取token
  debug: true // 开启debug可以看到准确的错误信息
})
  // .unless({ path: [/^\/home/] }); // 以 public 开头的请求地址不使用 jwt 中间件
module.exports = auth