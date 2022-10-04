import { Controller } from 'egg';
import { success, error } from '../interceptor/request';
export default class UserController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = 'Hello user';
  }
  public async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.query;

    const getVal = ['id', 'username', 'role'];
    const sql = `select ${getVal.join()} from user_list where username="${username}" and password="${password}"`;

    const result: any = await this.app.mysql.query(sql);

    if (result.length) {
      ctx.body = success({
        res: result,
        message: '登录成功！',
      });
    } else {
      ctx.body = error({
        message: '登录失败！',
      });
    }
  }
}
