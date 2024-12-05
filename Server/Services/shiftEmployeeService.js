const shiftEmployeeRepo = require('../Repositories/shiftEmployeeRepo');

const getAllShiftsEmployee = async () => {
    return shiftEmployeeRepo.getAllShiftEmployees();
}

const getShiftEmployeeById = async (id) => {
    return shiftEmployeeRepo.getShiftEmployeeById(id);
}

const addShiftEmployee = async (shiftEmployee) => {
    await shiftEmployeeRepo.addShiftEmployee(shiftEmployee);
    return 'Created';
}

const updateShiftEmployee = async (id, shiftEmployee) => {
    await shiftEmployeeRepo.updateShiftEmployee(id, shiftEmployee);
    return 'Updated';
}

const deleteShiftEmployee = async (id) => {
    await shiftEmployeeRepo.deleteShiftEmployee(id);
    return 'Deleted';
}

const deleteShiftEmployeeByEmployeeId = async (employeeId) => {
    await shiftEmployeeRepo.deleteShiftEmployeeByEmployeeId(employeeId);
    return 'Deleted';
}

module.exports = {getAllShiftsEmployee, getShiftEmployeeById, addShiftEmployee, updateShiftEmployee, deleteShiftEmployee, deleteShiftEmployeeByEmployeeId};