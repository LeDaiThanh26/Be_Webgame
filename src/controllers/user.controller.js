const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// REGISTER
exports.register = async (req, res) => {
  const { name, email, password } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  res.status(201).json({ message: 'Register success' })
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
  const user = await User.findById(req.userId).select('-password')
  res.json(user)
}

//lay tat ca user
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-[password')
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

    // Chưa đủ 60s → không cộng gì
    // if (!playSeconds || playSeconds < 60) {
    //   return res.json({
    //     success: true,
    //     xpAdded: 0
    //   })
    // }

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
