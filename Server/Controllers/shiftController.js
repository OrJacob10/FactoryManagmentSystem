const express = require('express');
const router = express.Router();
const shiftService = require('../Services/shiftService');
const authenticateToken = require('../middleware/authenticateToken');
const mongoose = require('mongoose');
const actionsHandler = require('../middleware/actionsHandler');

router.get('/', authenticateToken,actionsHandler, async (req, res) => {
    try {
        const shifts = await shiftService.getAllShifts();
        return res.json(shifts);
     } catch (e) {
        return res.status({error: e.message});
    }
})

router.get('/:id', authenticateToken,actionsHandler, async (req, res) => {
    try{
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID input' });
        }

        const shift = await shiftService.getShiftById(id);
        if (!shift) {
            return res.status(404).json({ error: 'shift not found' });
        }
    }
    catch(e){
        return res.status({error: e.message});
    }
})

router.post('/',authenticateToken,actionsHandler, async (req, res) => {
    try{
        const shift = req.body;
        const status = await shiftService.addShift(shift);
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

        const shift = req.body;
        if (!shift) {
            return res.status(404).json({ error: 'shift not found' });
        }

        const status = await shiftService.updateShift(id, shift);
        return res.json(status);
    }
    catch(e){
        return res.status({error: e.message});
    }
})

router.delete('/:id',authenticateToken,actionsHandler, async (req, res) => {
    try{
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID input' });
        }
        const status = await shiftService.deleteShift(id);
        return res.json(status);
    }
    catch(e){
        return res.status({error: e.message});
    }
})

module.exports = router;