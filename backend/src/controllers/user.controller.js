const userService = require('../services/user.service');
const RoleConstant = require('../constants/role.constants');
const { successResponse, errorResponse } = require('../utils/response');
const { AppError } = require('../middlewares/errorHandler.middleware');

// Get all users
exports.getAll = async (req, res, next) => {
    try {
        const role = req.user?.role;
        if (role !== RoleConstant.ADMIN) {
            throw new AppError('Forbidden: You do not have permission to access this resource.', 403);
        }

        const users = await userService.getAllUsers();
        return successResponse(res, users, 'Users retrieved successfully');
    } catch (error) {
        next(error);
    }
};

// Get user by ID
exports.getById = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        const role = req.user?.role;
        
        if (req.params.id !== userId && role !== RoleConstant.ADMIN) {
            throw new AppError('Forbidden: You do not have permission to access this resource.', 403);
        }

        const user = await userService.getUserById(req.params.id);
        return successResponse(res, user, 'User retrieved successfully');
    } catch (error) {
        next(error);
    }
};

// Create new user
exports.post = async (req, res, next) => {
    try {
        const newUser = await userService.createUser(req.body);
        return successResponse(res, newUser, 'User created successfully', 201);
    } catch (error) {
        next(error);
    }
};

// Update user
exports.put = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        const role = req.user?.role;
        
        if (req.params.id !== userId && role !== RoleConstant.ADMIN) {
            throw new AppError('Forbidden: You do not have permission to access this resource.', 403);
        }

        const updatedUser = await userService.updateUser(req.params.id, req.body);
        return successResponse(res, updatedUser, 'User updated successfully');
    } catch (error) {
        next(error);
    }
};

// Delete user
exports.delete = async (req, res, next) => {
    try {
        const result = await userService.deleteUser(req.params.id);
        return successResponse(res, result, 'User deleted successfully');
    } catch (error) {
        next(error);
    }
}; 