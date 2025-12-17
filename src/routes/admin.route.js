const router = require('express').Router()
const controller = require('../controllers/admin.controller')

const authAdmin = require('../middlewares/authAdmin.middleware')

router.post('/login', controller.login)
router.get('/me', authAdmin, controller.getMe)

module.exports = router
