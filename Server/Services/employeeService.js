const employeeRepo = require('../Repositories/employeeRepo');
const shiftEmployeeService = require('../Services/shiftEmployeeService');
const departmentRepo = require('../Repositories/departmentRepo');

const getAllEmployees = async () => {
    return employeeRepo.getAllEmployees();
}

const getEmployeeById = (id) => {
    return employeeRepo.getEmployeeById(id);
}

const addEmployee = async (employee) => {
    await employeeRepo.addEmployee(employee);
    return 'Created';
}

const updateEmployee = async (id, employee) => {
    await employeeRepo.updateEmployee(id, employee);
    return 'Updated';
}

const deleteEmployee = async (employeeId) => {
    // Check if the employee is a manager of a department
    const department = await departmentRepo.findDepartmentByManagerId(employeeId);
    console.log(department);
    
    if (department) {
        // Unset managerId for the department
        await departmentRepo.unsetManagerId(employeeId);
    }

    // Delete the employee
    await employeeRepo.deleteEmployee(employeeId);
    await shiftEmployeeService.deleteShiftEmployeeByEmployeeId(employeeId);
    return "Deleted";
};

module.exports = {getAllEmployees, getEmployeeById, addEmployee, updateEmployee, deleteEmployee};