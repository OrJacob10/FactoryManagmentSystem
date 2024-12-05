const express = require('express');
const router = express.Router();
const departmentService = require('../Services/departmentService');
const authenticateToken = require('../middleware/authenticateToken');
const mongoose = require('mongoose');
const actionsHandler = require('../middleware/actionsHandler');

router.get('/', authenticateToken,actionsHandler, async (req, res) => {
    try {
        const departments = await departmentService.getAllDepartments();
        return res.json(departments);
     } catch (e) {
        return res.status({error: e.message});
    }
})

router.get('/:id',authenticateToken,actionsHandler, async (req, res) => {
    try{
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID input' });
        }

        const department = await departmentService.getDepartmentById(id);
        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }
        return res.json(department);

    }
    catch(e){
        return res.status({error: e.message});
    }
})

router.post('/',authenticateToken,actionsHandler, async (req, res) => {
    try{
        const department = req.body;
        const status = await departmentService.addDepartment(department);
        return res.json(status);
    }
    catch(e){
        return res.status({error: e.message});
    }
})

router.put('/:id',authenticateToken,actionsHandler, async (req, res) => {
    try{
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID input' });
        }

        const department = req.body;
        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        const status = await departmentService.updateDepartment(id, department);
        return res.json(status);
    }
    catch(e){
        return res.status({error: e.message});
    }
})

router.put('/:departmentId/assign-manager', async (req, res) => {
    try {
        const { departmentId } = req.params;
        const { employeeId } = req.body; // Pass the new manager's ID in the request body

        // Call the service layer to assign the new manager
        const result = await departmentService.assignNewManager(departmentId, employeeId);

        return res.status(200).json(result);
    } catch (error) {
        // Handle errors and send an appropriate response
        return res.status(400).json({ success: false, message: error.message });
    }
});

router.delete('/:id',authenticateToken, actionsHandler, async (req, res) => {
    try{
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID input' });
        }
        const status = await departmentService.deleteDepartment(id);
        return res.json(status);
    }
    catch(e){
        return res.status({error: e.message});
    }
})

module.exports = router;