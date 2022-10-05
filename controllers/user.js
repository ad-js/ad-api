const { query, insert, update, del } = require('../db/index.js');
const bcrypt = require('bcryptjs');
const { assert, returnInfo } = require('../util/assert.js');

class UserController {
  static async create(ctx) {
    const { username, password, role } = (ctx.request.body);
    const model = await insert('INSERT INTO user  (username, password,role) VALUES (?,?,?)', [username, bcrypt.hashSync(password, 10), role]);
    const user = (await query('SELECT * FROM user  WHERE username=?', [username]))[0]; // 查找更新后的用户名是否已存在
    if(!assert(!user, 400, '用户名已存在', ctx)) return;
    returnInfo('注册成功', 200, model, ctx);
  }
  static async find(ctx) {
    const model = await query('SELECT * FROM user ');
    returnInfo('查询成功', 200, model, ctx);
  }
  static async findById(ctx) {
    const model = (await query('SELECT * FROM user  WHERE id = ?', [ctx.params.id]))[0];
    returnInfo('查询成功', 200, model, ctx);
  } 
  static async update(ctx) {
    const userId = ctx.params.id;
    if (!assert(userId == ctx.state.user.id, 403, '无权进行此操作', ctx)) return;
    const { username, password, role } = JSON.parse(ctx.request.body);
    const user = (await query('SELECT * FROM user  WHERE username=?', [username]))[0]; // 查找更新后的用户名是否已存在
    if(!assert(!user, 400, '用户名已存在', ctx)) return;
    const model = await update('UPDATE user  SET username = ?, password = ?, role = ? WHERE id = ?', [username, bcrypt.hashSync(password, 10), role, ctx.params.id]);
    returnInfo('更新成功', 200, model, ctx);
  }
  static async delete(ctx) {
    const userId = ctx.params.id;
    if (!assert(userId == ctx.state.user.id, 403, '无权进行此操作', ctx)) return;
    await del(`DELETE FROM user  WHERE id = ?`, [ctx.params.id]);
    returnInfo('删除成功', 200, null, ctx);
  }
  static async isSoleUsername(ctx) {
    const username = ctx.params.username;
    const user = (await query('SELECT * FROM user  WHERE username=?', [username]))[0];
    if(user) returnInfo('用户名已存在', 200, {isSole:false}, ctx);
    else returnInfo('用户名不存在', 200, {isSole:true}, ctx);
  }
}

module.exports = UserController;