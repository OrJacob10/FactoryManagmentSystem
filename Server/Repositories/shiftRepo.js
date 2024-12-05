const shiftModel = require('../Models/shiftModel');

const getAllShifts = () => {
    return shiftModel.find({});
}

const getShiftById = (id) => {
    return shiftModel.findById(id);
}

const addShift = (shift) => {
    return shiftModel.create(shift);
}

const updateShift= (id, shift) => {
    return shiftModel.findByIdAndUpdate(id, shift);
}

const deleteShift = (id) => {
    return shiftModel.findByIdAndDelete(id);
}

module.exports = {getAllShifts, getShiftById, addShift, updateShift, deleteShift};