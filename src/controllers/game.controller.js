const Game = require('../models/Game.model')
const getMockCategoryInfo = require('../helper/getMockCategoryInfo')
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
// READ ONE - Lấy game theo slug
exports.getGameBySlug = async (req, res, next) => {
  try {
    // Thử tìm game theo slug
    const game = await Game.findOne({ slug: req.params.slug })
    if (!game) {
      // Nếu không tìm thấy game -> Có thể là request lấy theo Category?
      // Chuyển sang middleware tiếp theo (getGamesByCategory)
      return next()
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
exports.getAllCategoriesWithGames = async (req, res) => {
  try {
    // 1. Truy vấn TẤT CẢ trò chơi
    const allGames = await Game.find().select('name category thumbnail video link_game slug').lean(); 

    if (allGames.length === 0) {
      return res.status(404).json({ message: 'No games found in the database.' });
    }

    // 2. NHÓM TRÒ CHƠI THEO DANH MỤC
    const groupedByCategory = allGames.reduce((acc, game) => {
      const categoryName = game.category;
      
      const gameData = {
        id: game._id ? game._id.toString() : game.name.replace(/\s/g, '-').toLowerCase(),
        image: game.thumbnail,
        video: game.video,
        title: game.name,
        slug: game.slug, 
      };

      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(gameData);
      return acc;
    }, {});
    
    // 3. ÁNH XẠ SANG CẤU TRÚC JSON
    const finalResult = Object.keys(groupedByCategory).map(categoryName => {
      const categorySlug = categoryName.toLowerCase().replace(/\s/g, '-');
      const mockCategoryInfo = getMockCategoryInfo(categorySlug, categoryName);

      return {
        id: categorySlug,
        image: mockCategoryInfo.image,
        title: categoryName,
        color: mockCategoryInfo.color,
        games: groupedByCategory[categoryName].slice(0, 6) // ✅ CHỈ LẤY 6 GAMES ĐẦU TIÊN
      };
    });

    // 4. TRẢ VỀ KẾT QUẢ - Wrap trong object data
    res.json({ data: finalResult });

  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories and games', error: error.message });
  }
};
// UPDATE - Cập nhật game
// UPDATE - Cập nhật game theo slug
exports.updateGame = async (req, res) => {
  try {
    const game = await Game.findOneAndUpdate(
      { slug: req.params.slug },
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
// DELETE - Xóa game theo slug
exports.deleteGame = async (req, res) => {
  try {
    const game = await Game.findOneAndDelete({ slug: req.params.slug })
    if (!game) {
      return res.status(404).json({ message: 'Game not found' })
    }
    res.json({ message: 'Game deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting game', error: error.message })
  }
}

