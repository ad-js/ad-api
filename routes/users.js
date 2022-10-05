const router = require('koa-router')();

const auth = require('../util/jwt');

const {
  create,
  find,
  findById,
  update,
  delete: del,
  isSoleUsername
} = require('../controllers/user');

router.prefix('/users');
router.use(['/'], auth);

router.post('/', create);
router.get('/', find);
router.get('/:id', findById);
router.put('/:id', update);
router.delete('/:id', del);
router.get('/issole/:username', isSoleUsername);

module.exports = router;
