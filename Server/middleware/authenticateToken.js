const jwt = require('jsonwebtoken');
const SECRET_KEY = 'OrJacob2001';

const authenticateToken = async (req, res, next) => {

    try{
    const token = req.headers["token"];

    if (!token) return res.status(401).json({success: false, message: 'Token is not provided.' });
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded);
    next();
    }
    
    catch(e){
        return res.status(401).json({success: false, message: 'token expired or invalid'});
    }
}

module.exports = authenticateToken;