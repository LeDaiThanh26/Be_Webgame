const router = require('express').Router()
const controller = require('../controllers/comment.controller')

router.post('/', controller.createComment)
router.get('/:idGame', controller.getComments)

module.exports = router

