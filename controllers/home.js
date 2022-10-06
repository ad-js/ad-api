const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/');
const { query } = require('../db/index.js');
const bcrypt = require('bcryptjs');
const {assert,returnInfo} = require('../util/assert.js');

class HomeController {
  static home(ctx) {
    ctx.body = 'hello world';
  }
  static async login(ctx) {
    const { username, password } = JSON.parse(ctx.request.body);
    // 1.根据用户名找用户
    const user = (await query('SELECT * FROM user  WHERE username = ?', [username]))[0];
    if(!assert(user, 422, '用户名不存在', ctx)) return 
    // 2.校验密码
    const isValid = bcrypt.compareSync(password, user.password);
    if(!assert(isValid, 401, '密码错误', ctx)) return
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "3h",
    });
    ctx.cookies.set(
      'token',
      token,
      {
        domain: 'localhost', // 设置 cookie 的域
        path: '/', // 设置 cookie 的路径
        maxAge: 3 * 60 * 60 * 1000, // cookie 的有效时间 ms
        expires: new Date('2022-12-30'), // cookie 的失效日期，如果设置了 maxAge，expires 将没有作用
        httpOnly: true, // 是否要设置 httpOnly
        overwrite: true // 是否要覆盖已有的 cookie 设置
      }
    );
    returnInfo('登录成功', 200, null, ctx)
  }
}

module.exports = HomeController;