import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  router.get('/', controller.home.index);
  /**
   * 用户
  */
  // 登录
  router.get('/user/login', controller.user.login);
  /**
   * 应用管理
  */
  // 获取 app list
  router.get('/app/list', controller.app.list);
  // 创建应用
  router.get('/app/create', controller.app.create);
  // 应用删除
  router.get('/user/del', controller.app.delte);
  // 应用更新
  router.get('/user/update', controller.app.update);
  /**
   * 广告管理
  */
  // 广告类型列表
  router.get('/ad/list', controller.ad.list);
  // 新增广告类型
  router.get('/ad/create', controller.ad.create);
  // 广告类型删除
  router.get('/ad/del', controller.ad.delte);
  // 广告类型更新
  router.get('/ad/update', controller.ad.update);
  /**
   * 投放管理
  */
  // 投放列表
  router.get('/launch/list', controller.launch.list);
  // 创建应用
  router.get('/launch/create', controller.launch.create);
  // 应用删除
  router.get('/launch/del', controller.launch.delte);
  // 应用更新
  router.get('/launch/update', controller.launch.update);
};
