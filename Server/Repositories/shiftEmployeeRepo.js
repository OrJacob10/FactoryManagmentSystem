const shiftEmployeeModel = require('../Models/shiftEmployeeModel');

const getAllShiftEmployees = () => {
    return shiftEmployeeModel.find({});
}

const getShiftEmployeeById = (id) => {
    return shiftEmployeeModel.findById(id);
}

const addShiftEmployee = (shiftEmployeee) => {
    return shiftEmployeeModel.create(shiftEmployeee);
}

const updateShiftEmployee = (id, shiftEmployeee) => {
    return shiftEmployeeModel.findByIdAndUpdate(id, shiftEmployeee);
}

const deleteShiftEmployee = (id) => {
    return shiftEmployeeModel.findByIdAndDelete(id);
}

const deleteShiftEmployeeByEmployeeId = (employeeId) => {
    return shiftEmployeeModel.deleteMany({employeeId: employeeId});
}

module.exports = {getAllShiftEmployees, getShiftEmployeeById, addShiftEmployee, updateShiftEmployee, deleteShiftEmployee, deleteShiftEmployeeByEmployeeId};