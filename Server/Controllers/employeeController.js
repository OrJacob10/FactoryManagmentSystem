const express = require('express');
const router = express.Router();
const employeeService = require('../Services/employeeService');
const mongoose = require('mongoose');
const authenticateToken = require('../middleware/authenticateToken');
const actionsHandler = require('../middleware/actionsHandler');

router.get('/', authenticateToken,actionsHandler, async (req, res) => {
    try {
        const employees = await employeeService.getAllEmployees();
        return res.json(employees);
     } catch (e) {
        return res.status({error: e.message});
    }
})

router.get('/:id', authenticateToken, actionsHandler, async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID input' });
        }

        const employee = await employeeService.getEmployeeById(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        return res.json(employee);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});


router.post('/',authenticateToken, actionsHandler, async (req, res) => {
    try{
        const employee = req.body;
        const status = await employeeService.addEmployee(employee);
        return res.json(status);
    }
    catch(e){
        return res.status({error: e.message});
    }
})

router.put('/:id', authenticateToken, actionsHandler, async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID input' });
        }

        const employee = req.body;
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        const status = await employeeService.updateEmployee(id, employee);
        return res.json({ message: status });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});


router.delete('/:id',authenticateToken,actionsHandler, async (req, res) => {
    try{
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID input' });
        }
        const status = await employeeService.deleteEmployee(id);
        return res.json(status);
    }
    catch(e){
        return res.status({error: e.message});
    }
})

module.exports = router;