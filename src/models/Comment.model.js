const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  id_user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  id_game: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Game', 
    required: true 
  },
  comment: { 
    type: String, 
    required: true 
  }
}, { timestamps: true })

module.exports = mongoose.model('Comment', commentSchema)