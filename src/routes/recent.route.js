const router = require('express').Router()
const controller = require('../controllers/recent.controller')
const auth = require('../middlewares/auth.middleware')

// Tất cả các route này đều không cần login
router.post('/', controller.addRecent)
router.get('/', controller.getRecents)
router.get('/:userId', controller.getRecentsByUserId)

module.exports = router
