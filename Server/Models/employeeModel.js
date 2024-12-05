const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    startWork: Number,
    departmentId: String,
}, {versionKey: false});

const model = mongoose.model('Employee', employeeSchema);

module.exports = model;