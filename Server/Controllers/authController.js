const jwt = require('jsonwebtoken');
const axios = require('axios');
const userService = require('../Services/userService');
const express = require('express');
const router = express.Router();

const USERS_URL = "https://jsonplaceholder.typicode.com/users";
const SECRET_KEY = 'OrJacob2001';


router.post('/login', async (req, res) => {

    const { username, email } = req.body;
    
    const {data} = await axios.get(`${USERS_URL}?username=${username}&email=${email}`);
    console.log(data);
    if (data.length == 0) return res.json({ error: 'Invalid username or email' });
    const userId = data[0]?.id;
    const isLimitReached = await userService.isActionLimitReached(userId);
    if (isLimitReached) return res.json({ error: 'User reached action limit, Please try again tomorrow' });
    return res.json({ token: jwt.sign({userId: data[0].id, username: username }, SECRET_KEY) });
})

module.exports = router;