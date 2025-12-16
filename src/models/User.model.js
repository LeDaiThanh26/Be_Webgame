const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  avatar: String,
  experiencePoints: { type: Number, default: 0 },
  playTime: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
