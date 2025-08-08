const User = require('../models/user.model');
const Role = require('../models/auth/role.model');
const UserRole = require('../models/auth/user_roles.model');
const RoleConstant = require('../constants/role.constants');

// Get all users
exports.getAllUsers = async () => {
    try {
        return await User.find();
    } catch (error) {
        throw new Error('Error getting users: ' + error.message);
    }
};

// Get user by ID
exports.getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error('Error getting user: ' + error.message);
    }
};

// Create new user
exports.createUser = async (userData) => {
    try {
        const user = new User(userData);
        const newUser = await user.save();

        const role = await Role.findOne({ name: RoleConstant.USER });
        if (!role) {
            throw new Error('Role not found');  
        }

        const userRole = await UserRole.findOne({ userId: user.id });
        if (!userRole) {
            const createUserRole = new UserRole({
                userId: user.id,
                roleId: role.id
            });
            await createUserRole.save();
        }

        return newUser;
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

// Update user
exports.updateUser = async (id, userData) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }

        if (userData.name) user.username = userData.name;
        if (userData.email) user.email = userData.email;
        if (userData.avatar) user.avatar = userData.avatar;
        if (userData.password) user.password = userData.password;

        return await user.save();
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};

// Delete user
exports.deleteUser = async (id) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        await user.deleteOne();
        return { message: 'User deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
}; 