const Favourite = require('../models/Favourite.model')
const Game = require('../models/Game.model')

// CREATE - Thêm game vào favourite
exports.createFavourite = async (req, res) => {
  try {
    const { id_user, id_game } = req.body

    // Kiểm tra game có tồn tại không
    const game = await Game.findById(id_game)
    if (!game) {
      return res.status(404).json({ message: 'Game not found' })
    }

    // Kiểm tra đã favourite chưa
    const existingFavourite = await Favourite.findOne({ id_user, id_game })
    if (existingFavourite) {
      return res.status(400).json({ message: 'Game already in favourites' })
    }

    const favourite = await Favourite.create({ id_user, id_game })
    res.status(201).json({ message: 'Added to favourites successfully', data: favourite })
  } catch (error) {
    res.status(400).json({ message: 'Error adding favourite', error: error.message })
  }
}

// READ ALL - Lấy tất cả favourites
exports.getAllFavourites = async (req, res) => {
  try {
    const favourites = await Favourite.find()
      .populate('id_user', 'name email avatar')
      .populate('id_game')
      .sort({ createdAt: -1 })
    res.json({ data: favourites })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favourites', error: error.message })
  }
}

// READ BY USER - Lấy favourites của một user
exports.getFavouritesByUser = async (req, res) => {
  try {
    const { userId } = req.params
    const favourites = await Favourite.find({ id_user: userId })
      .populate('id_game')
      .sort({ createdAt: -1 })
    res.json({ data: favourites })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favourites', error: error.message })
  }
}

// DELETE BY USER AND GAME - Xóa favourite theo user và game
exports.deleteFavouriteByUserAndGame = async (req, res) => {
  try {
    const { userId, gameId } = req.params
    const favourite = await Favourite.findOneAndDelete({ id_user: userId, id_game: gameId })
    if (!favourite) {
      return res.status(404).json({ message: 'Favourite not found' })
    }
    res.json({ message: 'Removed from favourites successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting favourite', error: error.message })
  }
}

