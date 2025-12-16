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