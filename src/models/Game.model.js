const mongoose = require('mongoose')
const slugify = require('slugify')

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
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
  link_game: String,
  video: String
}, { timestamps: true })

gameSchema.pre('save', async function() {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true })
  }
})
module.exports = mongoose.model('Game', gameSchema)