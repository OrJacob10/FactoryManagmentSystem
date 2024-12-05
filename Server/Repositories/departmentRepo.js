const departmentModel = require('../Models/departmentModel');

const getAllDepartments = () => {
    return departmentModel.find({});
}

const getDepartmentById = (id) => {
    return departmentModel.findById(id);
}

const addDepartment = (department) => {
    return departmentModel.create(department);
}

const updateDepartment = (id, department) => {
    return departmentModel.findByIdAndUpdate(id, department);
}

const deleteDepartment = (id) => {
    return departmentModel.findByIdAndDelete(id);
}

const findDepartmentByManagerId = (managerId) => {
    return departmentModel.findOne({ manager: managerId });
};

const unsetManagerId = (employeeId) => {
    return departmentModel.updateOne({ manager: employeeId }, { $unset: { manager: "" } });
};

const updateManager = (departmentId, employeeId) => {
    return departmentModel.updateOne({_id: departmentId }, { manager: employeeId });
};

const deleteDepartmentsByManager = (managerId) => {
    return departmentModel.deleteMany({ managerId });
};



module.exports = {getAllDepartments, getDepartmentById, addDepartment, updateDepartment, deleteDepartment, findDepartmentByManagerId, unsetManagerId, updateManager, deleteDepartmentsByManager};