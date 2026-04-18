const { Server } = require('socket.io')

let io = null

function initIO(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  })

  console.log('[Socket.IO] Server initialized')
  return io
}

function getIO() {
  if (!io) throw new Error('[Socket.IO] Server chưa được khởi tạo. Gọi initIO() trước.')
  return io
}

module.exports = { initIO, getIO }
