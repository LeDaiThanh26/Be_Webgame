const router = require('express').Router()
const controller = require('../controllers/game.controller')

router.post('/', controller.createGame)
router.get('/', controller.getAllGames)
router.get('/:slug', controller.getGameBySlug)
router.put('/:slug', controller.updateGame)
router.delete('/:slug', controller.deleteGame)

module.exports = router

