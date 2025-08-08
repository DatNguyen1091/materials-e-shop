const mongoose = require('mongoose');

const commonFields = {
    createdAt: { type: Date, default: Date.now, required: true },
    updatedAt: { type: Date, default: Date.now, required: true },
    isDeleted: { type: Boolean, default: false, required: true }
};

module.exports = commonFields;
