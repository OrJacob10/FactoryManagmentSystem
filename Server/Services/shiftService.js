const shiftRepo = require('../Repositories/shiftRepo');

const getAllShifts = async () => {
    return shiftRepo.getAllShifts();
}

const getShiftById = async (id) => {
    return shiftRepo.getShiftById(id);
}

const addShift = async (shift) => {
    await shiftRepo.addShift(shift);
    return 'Created';
}

const updateShift = async (id, shift) => {
    await shiftRepo.updateShift(id, shift);
    return 'Updated';
}

const deleteShift = async (id) => {
    await shiftRepo.deleteShift(id);
    return 'Deleted';
}

module.exports = {getAllShifts, getShiftById, addShift, updateShift, deleteShift};