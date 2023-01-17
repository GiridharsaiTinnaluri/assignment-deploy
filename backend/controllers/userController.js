const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const USER = require('../models/userSchema');

//generates the JWT Token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '3d'
    })
}

// POST Request // Public Route
const registerUser = asyncHandler(async (req, res) => {

    const {name, email, password} = req.body; 

    // req data exists
    if(!name || !email || !password) {
        res.status(400);
        throw new Error('Please Add All Fields')
    }

    // check validation 
    let Regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(!Regex.test(email)) {
        res.status(400);
        throw new Error('Invalid Credentials')
    }

    //check user exists already
    const user = await USER.find({ email });

    if(user && user.length > 0) {
        res.status(400);
        throw new Error('User Already Exists');
    }

    // Hashing passwords
    const hashPassword = await bcrypt.hash(password, 12);

    //if everything is correct, create user
    const newUser = await USER.create({
         username: name
        ,email: email
        ,password: hashPassword
        ,habits:[]
        ,totalHabits: 0
        ,highestStreak: 0
        ,currentStreak: 0
        ,milestonePoints: 0
        ,nextMilestone: 1
        ,streakDate: 0
        ,rewards:0
    })

    if(newUser) {
       return res.status(201).json({
            newUser : {
                id: newUser.id
                ,username : newUser.username
                ,email : newUser.email
                ,totalHabits: 0
                ,highestStreak: 0
                ,currentStreak: 0
                ,milestonePoints: 0
                ,nextMilestone: 1
                ,streakDate: 0 
                ,rewards: 0
            },
            token: generateToken(newUser.id),
            mesagge: "Registered Successfully"
        })
    } else {
        res.status(400);
        throw new Error("Registered unsuccessful")
    }
});

// POST Request // Public Route
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // req data exists
    if(!email || !password) {
        res.status(400);
        throw new Error('All Fields Are Required')
    }

    // validate
    let Regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(!Regex.test(email)) {
        res.status(400);
        throw new Error('Invalid Credentials')
    }

    // check email exists
    const user = await USER.find({ email });
    //console.log(user);
    if(user.length === 0) {
        res.status(400);
        throw new Error('Invalid Credentials');
    } 

    const isPassMatched = await bcrypt.compare(password, user[0].password);


    if(isPassMatched) {
        res.status(200).json({
            newUser:{
                id: user[0].id
                ,username: user[0].username
                ,email: user[0].email
                ,totalHabits: user[0].totalHabits
                ,highestStreak: user[0].highestStreak
                ,currentStreak: user[0].currentStreak
                ,milestonePoints: user[0].milestonePoints
                ,nextMilestone: user[0].nextMilestone
                ,rewards: user[0].rewards
            }
            ,token: generateToken(user[0].id)
            ,message: "Login succesfully"
        })

    } else {
        res.status(400);
        throw new Error('Invalid Credentials');
    }

})

module.exports = {
    registerUser,
    loginUser
}