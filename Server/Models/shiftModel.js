const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
    date: Date,
    startingHour: Number,
    endingHour: Number,
}, {versionKey: false});

const model = mongoose.model('Shift', shiftSchema);

module.exports = model;