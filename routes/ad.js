const router = require('koa-router')();

const auth = require('../util/jwt');

const {
  create,
  find,
  findById,
  update,
  delete: del,
  findAllAdByAppId
} = require('../controllers/ad');

router.prefix('/ad');
router.use(['/'], auth);

router.post('/', create);
router.get('/', find);
router.get('/:id', findById);
router.put('/:id', update);
router.delete('/:id', del);
router.get('/findAllAdByAppId/:id', findAllAdByAppId);

module.exports = router;