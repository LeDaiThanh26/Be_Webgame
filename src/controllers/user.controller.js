const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { broadcastLeaderboard } = require('../sockets/leaderboard.socket')
const fetchAnimeAvatar = require('../helper/fetchAnimeAvatar')

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: 'Email đã tồn tại' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const avatar = await fetchAnimeAvatar()

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      avatar
    })

    res.status(201).json({ message: 'Đăng ký thành công' })

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Email đã tồn tại' })
    }

    res.status(500).json({ message: 'Internal server error' })
  }

}

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) return res.status(400).json({ message: 'User not found' })

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return res.status(400).json({ message: 'Wrong password' })

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  res.json({ token })
}
//Controller lấy user từ token
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password')
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message })
  }
}

//lay tat ca user
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message })
  }
}

//cong diem tu game da click
exports.addPoints = async (req, res) => {
  try {
    const { userId, playSeconds } = req.body
    console.log("ADD POINT:", userId, playSeconds);

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' })
    }

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    /* ===== XP CALC ===== */
    const minutes = Math.floor(playSeconds / 60)

    let xp = minutes * 5

    if (minutes >= 5) {
      xp += 10
    }

    xp = Math.min(xp, 60)

    /* ===== UPDATE USER ===== */
    user.experiencePoints += xp
    user.playTime += playSeconds

    await user.save()

    // Broadcast realtime leaderboard update tới tất cả WS clients
    broadcastLeaderboard().catch((err) => console.error('[WS] broadcast failed:', err.message))

    res.json({
      success: true,
      xpAdded: xp,
      totalXp: user.experiencePoints,
      totalPlayTime: user.playTime
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
