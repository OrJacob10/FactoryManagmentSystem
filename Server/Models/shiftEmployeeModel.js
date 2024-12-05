const mongoose = require('mongoose');

const shiftEmployeeSchema = new mongoose.Schema({
    employeeId: String,
    shiftId: String,
}, {versionKey: false});

const model = mongoose.model('ShiftEmployee', shiftEmployeeSchema);

module.exports = model;