const jwt = require('jsonwebtoken');

const accessTokenSecret = process.env.JWT_SECRET; 

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    jwt.verify(token, accessTokenSecret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Token is invalid or expired' });
        }

        req.user = decoded;
        next();
    });
};

module.exports = authenticateToken;