import { Controller } from 'egg';

export default class LaunchController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = 'Hello ad';
  }
  public async list() {
    const { ctx } = this;
    ctx.body = {
      ldq: 1,
    };
  }
  public async create() {
    const { ctx } = this;
    ctx.body = {
      ldq: 1,
    };
  }
  public async delte() {
    const { ctx } = this;
    ctx.body = {
      ldq: 1,
    };
  }
  public async update() {
    const { ctx } = this;
    ctx.body = {
      ldq: 1,
    };
  }
}
