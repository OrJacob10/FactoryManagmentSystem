const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userService = require('../Services/userService');

router.get('/', async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.json(users);
     } catch (e) {
        return res.status({error: e.message});
    }
})

router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const user  = await userService.getUserById(id);
        if(!user) return res.status(404).json({error: 'User not found'});
        return res.json(user);
    }
    catch(e){
        return res.status({error: e.message});
    }
})

router.get('/userId/:id', async (req, res) => {
    try{
        const userId = +req.params.id;
        const user  = await userService.getUserByUserId(userId);
        if(!user) return res.status(404).json({error: 'User not found'});
        return res.json(user);
    }
    catch(e){
        return res.status({error: e.message});
    }
})


router.post('/', async (req, res) => {
    try{
        const user = req.body;
        const status = await userService.addUser(user);
        return res.json(status);
    }
    catch(e){
        return res.status({error: e.message});
    }
})
// ------------- users cannot be deleted or updated --------------------------------

// router.put('/:id', async (req, res) => {
//     try{
//         const id = req.params.id;
//         const user = req.body;
//         const status = await userService.updateUser(id, user);
//         return res.json(status);
//     }
//     catch(e){
//         return res.status({error: e.message});  
//     }
// })

// router.delete('/:id', async (req, res) => {
//     try{
//         const id = req.params.id;
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ error: 'Invalid ID input' });
//         }
//         const status = await userService.deleteUser(id);
//         return res.json(status);
//     }
//     catch(e){
//         return res.status({error: e.message});
//     }
// })

module.exports = router;