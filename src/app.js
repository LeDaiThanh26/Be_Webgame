const express = require('express')
const cors = require('cors')

const userRouter = require('./routes/user.route')
const gameRouter = require('./routes/game.route')
const favouriteRouter = require('./routes/favourite.route')
const commentRouter = require('./routes/comment.route')
const adminRouter = require('./routes/admin.route')

const app = express()

// Middlewares chung
app.use(cors({
  origin: 'http://localhost:3000', // Port Next.js của bạn
  credentials: true
}))
app.use(express.json())

// Routes
app.use('/api/users', userRouter)
app.use('/api/games', gameRouter)
app.use('/api/favourites', favouriteRouter)
app.use('/api/comments', commentRouter)
app.use('/api/admin', adminRouter)

// Route kiểm tra server
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

module.exports = app
