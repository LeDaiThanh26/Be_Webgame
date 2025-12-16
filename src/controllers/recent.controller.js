
const Recent = require('../models/Recent.model')

// Thêm game vào danh sách recent
exports.addRecent = async (req, res) => {
    try {
        const { gameId, userId } = req.body

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' })
        }

        if (!gameId) {
            return res.status(400).json({ message: 'Game ID is required' })
        }

        // 1. Xóa record cũ nếu game này đã có trong list (để đưa lên đầu)
        await Recent.findOneAndDelete({ id_user: userId, id_game: gameId })

        // 2. Kiểm tra số lượng game recent hiện tại
        const count = await Recent.countDocuments({ id_user: userId })

        // 3. Nếu đã đủ 16 game, xóa game cũ nhất
        if (count >= 16) {
            const oldest = await Recent.findOne({ id_user: userId }).sort({ createdAt: 1 })
            if (oldest) {
                await Recent.findByIdAndDelete(oldest._id)
            }
        }

        // 4. Thêm record mới
        const newRecent = new Recent({
            id_user: userId,
            id_game: gameId
        })
        await newRecent.save()

        res.json({ success: true, message: 'Added to recent games' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Lấy danh sách game recent
exports.getRecents = async (req, res) => {
    try {
        const userId = req.query.userId || req.body.userId

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' })
        }

        const recents = await Recent.find({ id_user: userId })
            .sort({ createdAt: -1 }) // Mới nhất lên đầu
            .populate('id_game') // Lấy thông tin game

        // Trả về danh sách game (extract từ recent record nếu cần, hoặc trả nguyên list)
        // Client thường cần list game, nên map ra luôn thì tiện hơn, nhưng populate trả về object game trong field id_game

        res.json(recents)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Lấy danh sách game recent theo userId (public hoặc auth tùy route)
exports.getRecentsByUserId = async (req, res) => {
    try {
        const { userId } = req.params

        const recents = await Recent.find({ id_user: userId })
            .sort({ createdAt: -1 })
            .populate('id_game')

        res.json(recents)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
