require('dotenv').config()
const http = require('http')
const app = require('./app')
const connectDB = require('./config/db')
const { initIO } = require('./socket')
const { registerAllSockets } = require('./sockets')

connectDB()

const PORT = process.env.PORT || 5000
const httpServer = http.createServer(app)

// Khởi tạo Socket.IO rồi đăng ký tất cả handlers
const io = initIO(httpServer)
registerAllSockets(io)

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
