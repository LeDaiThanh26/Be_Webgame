const User = require('../models/User.model')
const { getIO } = require('../socket')

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function fetchLeaderboard() {
  return User.find()
    .select('name experiencePoints playTime avatar')
    .sort({ experiencePoints: -1 })
    .limit(10)
    .lean()
}

// ─── Register namespace ───────────────────────────────────────────────────────
function registerLeaderboardSocket(io) {
  const nsp = io.of('/leaderboard')

  nsp.on('connection', async (socket) => {
    console.log('[Socket.IO /leaderboard] Client connected:', socket.id)

    try {
      const snapshot = await fetchLeaderboard()
      socket.emit('leaderboard', snapshot)
    } catch (err) {
      console.error('[Socket.IO /leaderboard] Error sending snapshot:', err.message)
    }

    socket.on('disconnect', (reason) => {
      console.log('[Socket.IO /leaderboard] Client disconnected:', socket.id, '|', reason)
    })
  })

  console.log('[Socket.IO] Namespace /leaderboard registered')
}

// ─── Broadcast helper (dùng trong controllers) ───────────────────────────────

async function broadcastLeaderboard() {
  try {
    const io = getIO()
    const data = await fetchLeaderboard()
    io.of('/leaderboard').emit('leaderboard', data)
    console.log('[Socket.IO /leaderboard] Broadcasted leaderboard update')
  } catch (err) {
    console.error('[Socket.IO /leaderboard] Broadcast error:', err.message)
  }
}

module.exports = { registerLeaderboardSocket, broadcastLeaderboard }
