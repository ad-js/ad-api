const router = require('koa-router')();
const { home, login } = require('../controllers/home');

router.prefix('/home');

router.get('/', home);

router.post('/login', login);

module.exports = router;
