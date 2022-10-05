const { query, insert, update, del } = require('../db/index.js');
const { returnInfo } = require('../util/assert.js');

class LaunchController {
  static async create(ctx) {
    const { appKey, adId, totalMoney, price, effectTotal, showTotal, startTime, endTime, peopleType, place } = (ctx.request.body);
    const model = await insert('INSERT INTO launch (app_key,ad_id,total_money,price,effect_total,show_total,start_time,end_time,people_type,place) VALUES (?,?,?,?,?,?,?,?,?,?)',
      [appKey, adId, totalMoney, price, effectTotal, showTotal, startTime, endTime, peopleType, place]);
    returnInfo('创建成功', 200, model, ctx);
  }
  static async find(ctx) {
    const model = await query('SELECT * FROM launch');
    returnInfo('查询成功', 200, model, ctx);
  }
  static async findById(ctx) {
    const adId = ctx.params.id;
    const model = (await query('SELECT * FROM launch  WHERE id = ?', [adId]))[0];
    returnInfo('查询成功', 200, model, ctx);
  }
  static async update(ctx) {
    const launchId = ctx.params.id;
    const { appKey, adId, totalMoney, price, effectTotal, showTotal, startTime, endTime, peopleType, place } = (ctx.request.body);
    const model = await update('UPDATE launch  SET app_key=?,ad_id=?,total_money=?,price=?,effect_total=?,show_total=?,start_time=?,end_time=?,people_type=?,place=? WHERE id = ?',
      [appKey, adId, totalMoney, price, effectTotal, showTotal, startTime, endTime, peopleType, place, launchId]);
    returnInfo('更新成功', 200, model, ctx);
  }
  static async delete(ctx) {
    const launchId = ctx.params.id;
    await del(`DELETE FROM launch  WHERE id = ?`, [launchId]);
    returnInfo('删除成功', 200, null, ctx);
  }
}

module.exports = LaunchController;