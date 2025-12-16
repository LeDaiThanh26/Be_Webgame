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

// READ RANDOM - Lấy 4 game ngẫu nhiên
exports.getRandomGames = async (req, res) => {
  try {
    const games = await Game.aggregate([{ $sample: { size: 4 } }])
    res.json({ data: games })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching random games', error: error.message })
  }
}

// READ RANDOM 12 - Lấy 12 game ngẫu nhiên
exports.getRandom12Games = async (req, res) => {
  try {
    const games = await Game.aggregate([{ $sample: { size: 12 } }])
    res.json({ data: games })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching random games', error: error.message })
  }
}

// READ ONE - Lấy game theo slug
exports.getGameBySlug = async (req, res) => {
  try {
    const game = await Game.findOne({ slug: req.params.slug })
    if (!game) {
      return res.status(404).json({ message: 'Game not found' })
    }
    res.json({ data: game })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching game', error: error.message })
  }
}
// READ  - Lấy game theo danh mục
exports.getGamesByCategory = async (req, res) => {
  try {
    const urlCategory = req.params.category; 
    let categoryName = urlCategory.replace(/-/g, ' '); 
    categoryName = categoryName.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
    const games = await Game.find({ category: categoryName }); 
    

    if (games.length === 0) {
      return res.status(404).json({ message: `No games found in category: ${categoryName}` });
    }

    res.json({ data: games });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching games', error: error.message });
  }
};
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

