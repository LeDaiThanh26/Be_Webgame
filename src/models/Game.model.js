const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dev: String,
  release_date: Date,
  last_update: { type: Date, default: Date.now },
  technology: String,
  platforms: [String],
  category: String,
  thumbnail: String,
  description: String,
  how_to_play: String,
  image: [String],
  link_game: String
}, { timestamps: true })

module.exports = mongoose.model('Game', gameSchema)