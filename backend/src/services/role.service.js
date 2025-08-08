const User = require('../models/user.model');
const Role = require('../models/auth/role.model');

// Get all roles
exports.getAllRoles = async () => {
    try {
        return await Role.find();
    } catch (error) {
        throw new Error('Error getting roles: ' + error.message);
    }
};

// Get role by ID
exports.getRoleById = async (id) => {
    try {
        const role = await Role.findById(id);
        if (!role) {
            throw new Error('Role not found');
        }
        return role;
    } catch (error) {
        throw new Error('Error getting role: ' + error.message);
    }
};

// Create new role
exports.createRole = async (roleData) => {
    try {
        const role = new Role(roleData);
        const newRole = await role.save();

        return newRole;
    } catch (error) {
        throw new Error('Error creating role: ' + error.message);
    }
};

// Update role
exports.updateRole = async (id, roleData) => {
    try {
        const role = await Role.findById(id);
        if (!role) {
            throw new Error('Role not found');
        }

        if (roleData.name) role.name = roleData.name;
        if (roleData.description) role.description = roleData.description;

        return await role.save();
    } catch (error) {
        throw new Error('Error updating role: ' + error.message);
    }
};

// Delete role
exports.deleteRole = async (id) => {
    try {
        const role = await Role.findById(id);
        if (!role) {
            throw new Error('Role not found');
        }
        await role.deleteOne();
        return { message: 'Role deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting role: ' + error.message);
    }
}; 