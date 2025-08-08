const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  resources: { type: String, required: true },
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  canCreate:{type: Boolean, require: true},
  canUpdate:{type: Boolean, require: true},
  canRead:{type: Boolean, require: true},
  canDelete:{type: Boolean, require: true},
  description: { type: String }
});

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;
