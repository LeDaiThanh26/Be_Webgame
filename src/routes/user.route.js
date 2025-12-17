const router = require('express').Router()
const controller = require('../controllers/user.controller')
const auth = require('../middlewares/auth.middleware')

router.post('/register', controller.register)
router.post('/login', controller.login)
router.post('/addpoint', controller.addPoints)
router.get('/me', auth, controller.getMe)
router.get('/', controller.getAllUsers)
module.exports = router
