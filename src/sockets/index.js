const { registerLeaderboardSocket } = require('./leaderboard.socket')
// Thêm feature mới: chỉ cần import và gọi ở đây
// const { registerChatSocket }         = require('./chat.socket')
// const { registerNotificationSocket } = require('./notification.socket')
// const { registerGameSocket }         = require('./game.socket')

/**
 * Đăng ký tất cả Socket.IO namespaces/handlers vào io.
 * Khi muốn thêm feature mới → tạo file mới + thêm 1 dòng ở đây.
 *
 * @param {import('socket.io').Server} io
 */
function registerAllSockets(io) {
  registerLeaderboardSocket(io)
  // registerChatSocket(io)
  // registerNotificationSocket(io)
  // registerGameSocket(io)
}

module.exports = { registerAllSockets }
