const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: String,
    manager: String,
}, {versionKey: false});

const model = mongoose.model('Department', departmentSchema);

module.exports = model;