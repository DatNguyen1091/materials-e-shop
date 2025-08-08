const { AppError } = require('../utils/errors');

const authorize = (requiredPermission) => {
    return (req, res, next) => {
        try {
            const user = req.user;

            if (!user || !user.permissions || !Array.isArray(user.permissions)) {
                throw new AppError('Forbidden: No access', 403);
            }

            if (!user.permissions.includes(requiredPermission)) {
                throw new AppError(`Forbidden: You need the "${requiredPermission}" permission to access`, 403);
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};

module.exports = authorize;
