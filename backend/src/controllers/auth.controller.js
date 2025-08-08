const authService = require('../services/auth.service');

// Login
exports.login = async (req, res) => {
    try {
        const token = await authService.login(req.body);
        res.status(200).json(token);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Refresh Token 
exports.refreshToken = async (req, res) => {
    try {
        const token = await authService.refreshToken(req.body);
        res.status(200).json(token);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};