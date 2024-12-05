const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: Number,
    fullName: String,
    numOfActions: Number,
    currentActions: Number,
    lastLogin: Date
}, {versionKey: false});

const model = mongoose.model('User', userSchema);

module.exports = model;