const departmentRepo = require('../Repositories/departmentRepo');
const employeeRepo = require('../Repositories/employeeRepo');

const getAllDepartments = async () => {
    return departmentRepo.getAllDepartments();
}

const getDepartmentById = async (id) => {
    return departmentRepo.getDepartmentById(id);
}

const addDepartment = async (department) => {
    await departmentRepo.addDepartment(department);
    return 'Created';
}

const updateDepartment = async (id, department) => {
    await departmentRepo.updateDepartment(id, department);
    return 'Updated';
}

const deleteDepartment = async (id) => {
    await departmentRepo.deleteDepartment(id);
    return 'Deleted';
}


const assignNewManager = async (departmentId, employeeId) => {
    // Validate if the department exists
    const department = await departmentRepo.getDepartmentById(departmentId);
    if (!department) {
        throw new Error("Department not found");
    }

    // Validate if the employee exists
    const employee = await employeeRepo.getEmployeeById(employeeId);
    if (!employee) {
        throw new Error("Employee not found");
    }

    // Check if the employee is already managing another department
    const isManager = await departmentRepo.findDepartmentByManagerId(employeeId);
    if (isManager) {
        throw new Error("This employee is already managing another department");
    }

    // Assign the new manager
    await departmentRepo.updateManager(departmentId, employeeId);

    return "Manager assigned successfully";
};
module.exports = {getAllDepartments, getDepartmentById, addDepartment, updateDepartment, deleteDepartment, assignNewManager};