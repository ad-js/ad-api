const router = require('koa-router')();

const auth = require('../util/jwt');

const {
  create,
  find,
  findById,
  update,
  delete: del
} = require('../controllers/launch');

router.prefix('/launch');
router.use(['/'], auth);

router.post('/', create);
router.get('/', find);
router.get('/:id', findById);
router.put('/:id', update);
router.delete('/:id', del);

module.exports = router; 