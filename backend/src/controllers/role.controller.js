const roleService = require('../services/role.service');

// Get all roles
exports.getAll = async (req, res) => {
    try {
        const roles = await roleService.getAllRoles();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get role by ID
exports.getById = async (req, res) => {
    try {
        const role = await roleService.getRoleById(req.params.id);
        res.json(role);
    } catch (error) {
        if (error.message === 'Role not found') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// Create new role
exports.post = async (req, res) => {
    try {
        const newRole = await roleService.createRole(req.body);
        res.status(201).json(newRole);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update role
exports.put = async (req, res) => {
    try {
        const updatedRole = await roleService.updateRole(req.params.id, req.body);
        res.json(updatedRole);
    } catch (error) {
        if (error.message === 'Role not found') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(400).json({ message: error.message });
        }
    }
};

// Delete role
exports.delete = async (req, res) => {
    try {
        const result = await roleService.deleteRole(req.params.id);
        res.json(result);
    } catch (error) {
        if (error.message === 'Role not found') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};