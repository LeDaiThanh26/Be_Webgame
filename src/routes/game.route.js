const router = require('express').Router()
const controller = require('../controllers/game.controller')

router.post('/', controller.createGame)
router.get('/random', controller.getRandomGames)
router.get('/random-12', controller.getRandom12Games)
router.get('/', controller.getAllGames)
router.get('/allcategory',controller.getAllCategoriesWithGames)
router.get('/:category',controller.getGamesByCategory)
router.get('/:slug', controller.getGameBySlug)
router.put('/:slug', controller.updateGame)
router.delete('/:slug', controller.deleteGame)

module.exports = router

