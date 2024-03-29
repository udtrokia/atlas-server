const Koa = require('koa');
const cors = require('@koa/cors');
const logger = require('koa-logger');
const Router = require('koa-router');
const bodyparser = require('koa-body');
const conf = require('./config');
const user = require('./user');
const group = require('./group');
const topic = require('./topic');

// main
class Index {
  static router() {
    let r = new Router();

    r
      .all('/', ctx => { ctx.body = 'hello, world';})
      .get('/api_v0/user/:id', user.info)
      .get('/api_v0/user/:name/thum', user.thum)
      .put('/api_v0/user/:id/update', user.update)
      .post('/api_v0/user/:id/sms', user.sms)
      .post('/api_v0/user/:id/sms_verify', user.sms_verify)
      .all('/api_v0/group/:id', group.info)
      .get('/api_v0/group/:id/data', group.data)
      .post('/api_v0/group/:id/topic', group.topic)
      .all('/api_v0/topic/:id', topic.info)

    return r;
  }

  static server(r) {
    const server = new Koa();
    console.log(`Server listen to ${conf.port}...`);

    server
      .use(cors())
      .use(logger())
      .use(bodyparser())
      .use(r.routes())
      .use(r.allowedMethods())
      .listen(conf.port);
  }

  static main() {
    Index.server(Index.router());
  }
}

Index.main();
