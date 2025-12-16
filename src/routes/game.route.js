const router = require('express').Router()
const controller = require('../controllers/game.controller')

router.post('/', controller.createGame)
router.get('/', controller.getAllGames)
router.get('/:id', controller.getGameById)
router.put('/:id', controller.updateGame)
router.delete('/:id', controller.deleteGame)

module.exports = router

