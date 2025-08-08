const permissionService = require('../services/permission.service.js');

// Get all premissions
exports.getAll = async (req, res) => {
    try {
        const permissions = await permissionService.getAllPermissions();
        res.json(permissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get premissions by RoleID
exports.getById = async (req, res) => {
    try {
        const permissions = await permissionService.getPermissionsByRoleId(req.params.roleId);
        res.json(permissions);
    } catch (error) {
        if (error.message === 'Premissions not found') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// Create new premission
exports.post = async (req, res) => {
    try {
        const newUser = await permissionService.createPermission(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update premission
exports.put = async (req, res) => {
    try {
        const updatedUser = await permissionService.updatePermission(req.params.id, req.body);
        res.json(updatedUser);
    } catch (error) {
        if (error.message === 'Premission not found') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(400).json({ message: error.message });
        }
    }
};

// Delete premission
exports.delete = async (req, res) => {
    try {
        const result = await permissionService.deletePermission(req.params.id);
        res.json(result);
    } catch (error) {
        if (error.message === 'Premission not found') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}; 