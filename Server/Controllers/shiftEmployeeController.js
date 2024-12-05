const express = require('express');
const router = express.Router();
const shiftEmployeeService = require('../Services/shiftEmployeeService');
const mongoose = require('mongoose');
const authenticateToken = require('../middleware/authenticateToken');
const actionsHandler = require('../middleware/actionsHandler');

router.get('/',authenticateToken, actionsHandler, async (req, res) => {
    try {
        const shiftEmployees = await shiftEmployeeService.getAllShiftsEmployee();
        return res.json(shiftEmployees);
     } catch (e) {
        return res.status({error: e.message});
    }
})

router.get('/:id',authenticateToken,actionsHandler,  async (req, res) => {
    try{
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID input' });
        }

        const shiftEmployee = await shiftEmployeeService.getShiftEmployeeById(id);
        if (!shiftEmployee) {
            return res.status(404).json({ error: 'shiftEmployee not found' });
        }
    }
    catch(e){
        return res.status({error: e.message});
    }
})

router.post('/',authenticateToken,actionsHandler,  async (req, res) => {
    try{
        const shiftEmployee = req.body;
        const status = await shiftEmployeeService.addShiftEmployee(shiftEmployee);
        return res.json(status);
    }
    catch(e){
        return res.status({error: e.message});
    }
})

router.put('/:id',authenticateToken,actionsHandler,  async (req, res) => {
    try{
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID input' });
        }

        const shiftEmployee = req.body;
        if (!shiftEmployee) {
            return res.status(404).json({ error: 'shiftEmployee not found' });
        }

        const status = await shiftEmployeeService.updateShiftEmployee(id, shiftEmployee);
        return res.json(status);
    }
    catch(e){
        return res.status({error: e.message});
    }
})

router.delete('/:id', authenticateToken,actionsHandler,  async (req, res) => {
    try{
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID input' });
        }
        const status = await shiftEmployeeService.deleteShiftEmployee(id);
        return res.json(status);
    }
    catch(e){
        return res.status({error: e.message});
    }
})

module.exports = router;