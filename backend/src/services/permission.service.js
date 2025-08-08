const Permission = require('../models/auth/permissions.model');
const Role = require('../models/auth/role.model.js');

// Get all permissions
exports.getAllPermissions = async () => {
    try {
        return await Permission.find();
    } catch (error) {
        throw new Error('Error getting permissions: ' + error.message);
    }
};

// Get permissions by ID
exports.getPermissionsByRoleId = async (id) => {
    try {
        const permissions = await Permission.find({roleId: id});
        if (!permissions) {
            throw new Error('Permissions not found');
        }
        return permissions;
    } catch (error) {
        throw new Error('Error getting permission: ' + error.message);
    }
};

// Create new permission
exports.createPermission = async (permissionData) => {
    try {
        const permission = new Permission(permissionData);
        const role = await Role.findById(permissionData.roleId);
        if (!role) {
            throw new Error('Role not found');  
        }

        const newPermission = await permission.save();

        return newPermission;
    } catch (error) {
        throw new Error('Error creating permission: ' + error.message);
    }
};

// Update permission
exports.updatePermission = async (id, permissionData) => {
    try {
        const permission = await Permission.findById(id);
        if (!permission) {
            throw new Error('Permission not found');
        }

        if (permissionData.resources) permission.resources = permissionData.resources;
        if (permissionData.roleId) permission.roleId = permissionData.roleId;
        if (permissionData.canCreate) permission.canCreate = permissionData.canCreate;
        if (permissionData.canUpdate) permission.canUpdate = permissionData.canUpdate;
        if (permissionData.canRead) permission.canRead = permissionData.canRead;
        if (permissionData.canDelete) permission.canDelete = permissionData.canDelete;
        if (permissionData.description) permission.description = permissionData.description;

        return await permission.save();
    } catch (error) {
        throw new Error('Error updating permission: ' + error.message);
    }
};

// Delete permission
exports.deletePermission = async (id) => {
    try {
        const permission = await Permission.findById(id);
        if (!user) {
            throw new Error('Permission not found');
        }
        await permission.deleteOne();
        return { message: 'Permission deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
}; 