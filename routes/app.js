const router = require('koa-router')();

const auth = require('../util/jwt');

const {
  create,
  find,
  findById,
  update,
  delete: del,
  findAllAppByUserId
} = require('../controllers/app');

router.prefix('/app');
router.use(['/'], auth);

router.post('/', create);
router.get('/', find);
router.get('/:id', findById);
router.put('/:id', update);
router.delete('/:id', del);
router.get('/findAllAppByUserId/:id', findAllAppByUserId);

module.exports = router;