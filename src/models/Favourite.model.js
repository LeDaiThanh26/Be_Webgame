const mongoose = require('mongoose')

const favoriteSchema = new mongoose.Schema({
  id_user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  id_game: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Game', 
    required: true 
  }
}, { timestamps: true })

module.exports = mongoose.model('Favorite', favoriteSchema)