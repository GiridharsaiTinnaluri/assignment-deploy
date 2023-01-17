const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userSchema');

const protect = asyncHandler(async (req, res, next) => {
    let token;
    console.log(req.headers);

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get tocken from headers
            token = req.headers.authorization.split(' ')[1];
        //    console.log(req.headers, "***************000001");

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if(!decoded.id) {
                res.status(401)
                throw new Error('Not authorized')
            }
        //  console.log(decoded, "***************");

            req.user = await User.findById(decoded.id).select('-password');
            if(req.user.length < 1) {
                res.status(401)
                throw new Error('Not authorized')
            }
            next()
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('Not authorized')
        }

    }
    
    if(!token) {
        res.status(401)
        throw new Error('Not authorized No token')
    }
})


module.exports = protect;