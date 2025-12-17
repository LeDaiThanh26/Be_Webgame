const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
  name: String,
  account: { type: String, unique: true },
  password: String,
}, { timestamps: true })

module.exports = mongoose.model('Admin', adminSchema)
