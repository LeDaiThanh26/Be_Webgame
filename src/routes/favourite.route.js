const router = require('express').Router()
const controller = require('../controllers/favourite.controller')

router.post('/', controller.createFavourite)
router.get('/', controller.getAllFavourites)
router.get('/user/:userId', controller.getFavouritesByUser)
router.delete('/user/:userId/game/:gameId', controller.deleteFavouriteByUserAndGame)

module.exports = router

