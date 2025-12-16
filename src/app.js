const express = require('express')
const cors = require('cors')

const userRouter = require('./routes/user.route')

const app = express()

// Middlewares chung
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/users', userRouter)

// Route kiểm tra server
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

module.exports = app
