const { query, insert, update, del } = require('../db/index.js');
const {returnInfo} = require('../util/assert.js');

class AdController {
  static async create(ctx) {
    const { name, adType, event, showType, imageUrl, videoUrl, appKey } = (ctx.request.body);
    const model = await insert('INSERT INTO ad  (name,ad_type,show_type,event,image_url,video_url) VALUES (?,?,?,?,?,?)', [name, adType, showType, event, imageUrl, videoUrl]);
    returnInfo('创建成功', 200, model, ctx);
  }
  static async find(ctx) {
    const model = await query('SELECT * FROM ad');
    returnInfo('查询成功', 200, model, ctx);
  }
  static async findById(ctx) {
    const adId = ctx.params.id;
    const model = (await query('SELECT * FROM ad  WHERE id = ?', [adId]))[0];
    returnInfo('查询成功', 200, model, ctx);
  }
  static async update(ctx) {
    const adId = ctx.params.id;
    const { name, adType, event, showType, imageUrl, videoUrl } = (ctx.request.body);
    const model = await update('UPDATE ad  SET name=?,ad_type=?,event=?,show_type=?,image_url=?,video_url=? WHERE id = ?', [name, adType, event, showType, imageUrl, videoUrl, adId]);
    returnInfo('更新成功', 200, model, ctx);
  }
  static async delete(ctx) {
    const appId = ctx.params.id;
    await del(`DELETE FROM ad  WHERE id = ?`, [appId]);
    returnInfo('删除成功', 200, null, ctx);
  }
  static async findAllAdByAppId(ctx) {
    const appId = ctx.params.id;
    const model = await query('SELECT * FROM ad  WHERE id in (SELECT ad_id FROM launch WHERE app_key in (SELECT app_key FROM app WHERE id = ?))', [appId]);
    returnInfo('查询成功', 200, model, ctx);
  }
}

module.exports = AdController;