const asyncHandler = require('express-async-handler');

const HABITS = require('../models/habitSchema');
const USER = require('../models/userSchema');
const DAILYPROGRESS = require('../models/dailyProgress');


// POST Request // Protected
const creatHabit = asyncHandler(async (req, res) => {
    const user = req.user;
    const { habitDescription, time, days, userId } = req.body;

    console.log(req.body, req.user);
   // console.log(req.body, "%%%%%%%%%%%%%%%%%%%%");


    // check req data is available
    if(!habitDescription || !time || !days || !userId) {
        res.status(400);
        throw new Error('All fields are required');
    }
    // console.log(userId, user.id);
    if(user.id !== userId) {
        res.status(403);
        throw new Error('Something went Wrong!');
    }
   console.log(user, "%%%%%%%%%%%%%%%%%%%%");

    //create new Habit
    const newhabit = await HABITS.create({
        description: habitDescription
        ,time: time
        ,days: days
        ,user: user._id
    })

    if(!newhabit) {
        res.status(400);
        throw new Error('Invlid User Data')
    }
    
    try{
        user.habits.push(newhabit._id);
        await user.save();
    } catch(err) {
        res.status(500);
        throw new Error('Something went wrong')
    }

   return res.status(201).json({
        message: "habit Created Succesfully"
    })
});

// GET Request // protected //not used
const getHabit = async (req, res) => {
    const user = req.user;
    const { habitId } = req.body;
};

// UPDATE Request // protected // not used
const UpdateHabit = asyncHandler(async (req, res) => {
    const user = req.user;
    const { habitId, description, time, days } = req.body;

     // check req data is available
     if(!habitId || !description || !time || !days) {
        res.status(400);
        throw new Error('All fields are required');
    }

    

    const habitDoc = await HABITS.findById({ habitId });

    if(!habitDoc || habitDoc.user !== user.id) {
        res.status(400);
        throw new Error('Invlid User Data')
    }

    try{
        habitDoc.description = description
        habitDoc.time = time
        habitDoc.days = days
        await habitDoc.save();
    } catch (error) {
        res.status(500);
        throw new Error('Something went wrong');
    }

    return res.status(201).json({
        message: "habit Updated Succesfully"
    })

});

// DELETE Request // protected // not used
const deleteHabit = asyncHandler(async (req, res) => {
    const user = req.user;
    const { habitId } = req.params.id;

    if(!habitId) {
        res.status(400);
        throw new Error('All fields are required');
    }

    // validate

    const habit = await HABITS.findById({ habitId })

    if(!habit || user.id !== habit.user) {
        res.status(400);
        throw new Error('Invalid user Data');
    }

    try {
        await habit.remove();
    } catch(error) {
        res.status(500);
        throw new Error('Something went Wrong');
    }

    try {
        await USER.findByIdAndUpdate(user.id, {
            $pull: {
                habits: habitId
            }
        });
    } catch(error) {
        res.status(500);
        throw new Error('Something went Wrong');
    }

    res.status(200).json({
        message: 'Deleted Successfully'
    })
    
});

// GET Request // protected
const getUserAllHabits = asyncHandler(async (req, res) => {
    const user = req.user;
    const { userId } = req.params.id;

    if(!userId || user.id !== userId) {
        res.status(400);
        throw new Error('All fields are required');
    }

    // validate

    const habit = await HABITS.find({ user: userId })

    if(!habit) {
        res.status(400);
        throw new Error('Invalid user Data');
    }

    res.status(200).json({
        message: 'fetched Successfully',
        data: habit
    })
});

// GET Request // protected
const getCurrentDayHabits = asyncHandler(async (req, res) => {
    const user = req.user;
    const { userId, day } = req.query;
    console.log(req.query, userId, day);
    //return res.status(404)
    if(!userId  || user.id !== userId) {
        res.status(400);
        throw new Error('All fields are required');
    }

    // validate
    const habit = await HABITS.find({ user: userId, days: day })

    if(habit.length < 1) {
        return res.status(200).json({
            message: 'No Data Found',
            data: []
        })
    }

    return res.status(200).json({
        message: 'fetched Successfully',
        data: habit
    })
    
});


const createDailyPosts = asyncHandler(async (req, res) => {
    const user = req.user
    console.log(user);
    const userId = req.body.userId
    const day = req.body.day.toString()
    const month = req.body.month.toString()
    const year = req.body.year.toString()
    const totalHabits = req.body.totalHabits.toString()
    const completedHabits =req.body.completedHabits.toString()

    console.log(userId, day, month, year, totalHabits, completedHabits);
    if(!userId || !day || !month || !year || !totalHabits || !completedHabits) {
        res.status(400);
        throw new Error('All fields are required');
    }

    //validate

    if(user.id !== userId) {
        res.status(403);
        throw new Error('Something went Wrong!');
    }

    //create new dailyprogress
    const userStats = await DAILYPROGRESS.create({
        userid: userId,
        day: Number(day),
        month: Number(month),
        year: Number(year),
        totalhabits: Number(totalHabits),
        completedhabits: Number(completedHabits)
    })

    if(!userStats) {
        res.status(400);
        throw new Error('Invlid User Data')
    }

    let milestone = Number(user.milestonePoints) + Number(completedHabits); 
    let nextMilestonePoints = Number(user.nextMilestone)
    let rewards = Number(user.rewards)

    if(milestone >= nextMilestonePoints) {
        nextMilestonePoints = (nextMilestonePoints + Math.floor(Math.random() * (150 - 50) ) + 50);
        rewards = (rewards + 2);
    }
    let getUser;
    try{
         getUser = await USER.findByIdAndUpdate(userId, {
            milestonePoints: milestone,
            nextMilestone: nextMilestonePoints,
            rewards: rewards
        },{new: true}).select('-password');
    } catch(err) {
        res.status(500);
        throw new Error('Something went wrong')
    }
    

    if(getUser.length < 1) {
        res.status(400);
        throw new Error('Invlid User Data')
    }

    return res.status(201).json({
            message: "daily Progress created Succesfully",
            data: getUser
    })

})


module.exports = {
    creatHabit
    ,getHabit
    ,UpdateHabit
    ,deleteHabit
    ,getUserAllHabits
    ,getCurrentDayHabits
    ,createDailyPosts
}