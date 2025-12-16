const Comment = require('../models/Comment.model')
const Game = require('../models/Game.model')
const User = require('../models/User.model')

// CREATE - Thêm comment mới
exports.createComment = async (req, res) => {
  try {
    const { id_user, id_game, comment } = req.body

    // Kiểm tra user có tồn tại không
    const user = await User.findById(id_user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Kiểm tra game có tồn tại không
    const game = await Game.findById(id_game)
    if (!game) {
      return res.status(404).json({ message: 'Game not found' })
    }

    // Kiểm tra comment có rỗng không
    if (!comment || comment.trim() === '') {
      return res.status(400).json({ message: 'Comment cannot be empty' })
    }

    const newComment = await Comment.create({ id_user, id_game, comment })
    const populatedComment = await Comment.findById(newComment._id)
      .populate('id_user', 'name email avatar')
      .populate('id_game', 'name slug')

    res.status(201).json({ message: 'Comment added successfully', data: populatedComment })
  } catch (error) {
    res.status(400).json({ message: 'Error creating comment', error: error.message })
  }
}

// READ - Lấy comments theo idGame với phân trang (3 comment mỗi trang)
exports.getComments = async (req, res) => {
  try {
    const { idGame } = req.params
    const { page = 1 } = req.query
    const limit = 3 // 3 comment mỗi trang
    const skip = (page - 1) * limit

    // Kiểm tra game có tồn tại không
    const game = await Game.findById(idGame)
    if (!game) {
      return res.status(404).json({ message: 'Game not found' })
    }

    // Lấy comments với phân trang theo idGame, populate user để có name luôn (không cần gọi api user nữa)
    const comments = await Comment.find({ id_game: idGame })
      .populate('id_user', 'name email avatar') // Populate để lấy name của user luôn
      .populate('id_game', 'name slug')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)

    // Đếm tổng số comments của game này
    const totalComments = await Comment.countDocuments({ id_game: idGame })
    const totalPages = Math.ceil(totalComments / limit)

    res.json({
      data: comments,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalComments,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error: error.message })
  }
}

