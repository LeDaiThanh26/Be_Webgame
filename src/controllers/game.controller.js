const Game = require('../models/Game.model')

// CREATE - Tạo game mới
exports.createGame = async (req, res) => {
  try {
    const game = await Game.create(req.body)
    res.status(201).json({ message: 'Game created successfully', data: game })
  } catch (error) {
    res.status(400).json({ message: 'Error creating game', error: error.message })
  }
}

// READ ALL - Lấy tất cả games
exports.getAllGames = async (req, res) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 })
    res.json({ data: games })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching games', error: error.message })
  }
}

// READ ONE - Lấy game theo ID
exports.getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id)
    if (!game) {
      return res.status(404).json({ message: 'Game not found' })
    }
    res.json({ data: game })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching game', error: error.message })
  }
}

// UPDATE - Cập nhật game
exports.updateGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(
      req.params.id,
      { ...req.body, last_update: Date.now() },
      { new: true, runValidators: true }
    )
    if (!game) {
      return res.status(404).json({ message: 'Game not found' })
    }
    res.json({ message: 'Game updated successfully', data: game })
  } catch (error) {
    res.status(400).json({ message: 'Error updating game', error: error.message })
  }
}

// DELETE - Xóa game
exports.deleteGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id)
    if (!game) {
      return res.status(404).json({ message: 'Game not found' })
    }
    res.json({ message: 'Game deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting game', error: error.message })
  }
}

