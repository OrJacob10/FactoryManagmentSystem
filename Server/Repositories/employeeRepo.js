const employeeModel = require('../Models/employeeModel');

const getAllEmployees = () => {
    return employeeModel.find({});
}

const getEmployeeById = (id) => {
    return employeeModel.findById(id);
}

const addEmployee = (employee) => {
    return employeeModel.create(employee);
}

const updateEmployee = (id, employeee) => {
    return employeeModel.findByIdAndUpdate(id, employeee);
}

const deleteEmployee = (id) => {
    return employeeModel.findByIdAndDelete(id);
}

module.exports = {getAllEmployees, getEmployeeById, addEmployee, updateEmployee, deleteEmployee};