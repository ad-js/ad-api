const { query, insert, update, del } = require('../db/index.js');
const { returnInfo } = require('../util/assert.js');
const { v4: uuidv4 } = require('uuid');

class AppController {
  static async create(ctx) {
    const { appName, userId } = (ctx.request.body);
    const appKey = uuidv4();
    const model = await insert('INSERT INTO app  (app_key, app_name) VALUES (?,?)', [appKey, appName]);
    await insert('INSERT INTO user_app  (user_id, app_id) VALUES (?,?)', [userId, model.insertId]);
    returnInfo('创建成功', 200, model, ctx);
  }
  static async find(ctx) {
    const model = await query('SELECT * FROM app ');
    returnInfo('查询成功', 200, model, ctx);
  }
  static async findById(ctx) {
    const model = (await query('SELECT * FROM app  WHERE id = ?', [ctx.params.id]))[0];
    returnInfo('查询成功', 200, model, ctx);
  }
  static async update(ctx) {
    const appId = ctx.params.id;
    const { appName } = JSON.parse(ctx.request.body);
    const model = await update('UPDATE app  SET app_name=? WHERE id = ?', [appName, appId]);
    returnInfo('更新成功', 200, model, ctx);
  }
  static async delete(ctx) {
    const appId = ctx.params.id;
    const { userId } = ctx.request.body;
    const process1 = del(`DELETE FROM app  WHERE id = ?`, [appId]);
    const process2 = del(`DELETE FROM user_app  WHERE app_id = ? and user_id = ?`, [appId, userId]);
    const process3 = del(`DELETE FROM launch  WHERE app_key in (SELECT app_key FROM app WHERE app_id = ?)`, [appId]);
    await Promise.all([process1, process2, process3]);
    returnInfo('删除成功', 200, null, ctx);
  }
  static async findAllAppByUserId(ctx) {
    const userId = ctx.params.id;
    const model = await query('SELECT * FROM app  WHERE id in (SELECT app_id FROM user_app WHERE id = ?)', [userId]);
    returnInfo('查询成功', 200, model, ctx);
  }
}

module.exports = AppController;