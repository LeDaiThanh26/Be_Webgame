const Admin = require('../models/Admin.model')
const jwt = require('jsonwebtoken')

// LOGIN ADMIN
exports.login = async (req, res) => {
    try {
        const { account, password } = req.body

        // 1. Tìm admin theo account
        const admin = await Admin.findOne({ account })
        if (!admin) {
            return res.status(404).json({ message: 'Tài khoản không tồn tại' })
        }

        // 2. So sánh mật khẩu (plain text theo yêu cầu)
        if (admin.password !== password) {
            return res.status(400).json({ message: 'Mật khẩu không đúng' })
        }

        // 3. Tạo token
        const token = jwt.sign(
            { adminId: admin._id, role: 'admin' },
            process.env.JWT_SECRET || 'secret', // Fallback nếu chưa có env
            { expiresIn: '1d' }
        )

        res.json({
            message: 'Đăng nhập thành công',
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                account: admin.account
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Lỗi server', error: error.message })
    }
}

// GET ADMIN INFO
exports.getMe = async (req, res) => {
    try {
        const admin = await Admin.findById(req.adminId).select('-password')
        if (!admin) {
            return res.status(404).json({ message: 'Không tìm thấy admin' })
        }
        res.json(admin)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Lỗi server', error: error.message })
    }
}
