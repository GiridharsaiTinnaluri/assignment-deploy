const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
        ,unique: true
    },
    password:{
        type: String,
        required: true
    },
    habits:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Habits'
        }
    ],
    totalHabits:{
        type: Number
    },
    highestStreak:{
        type: Number
    },
    currentStreak:{
        type: Number
    },
    milestonePoints:{
        type: Number
    },
    nextMilestone:{
        type: Number,
        required: true
    },
    streakDate:{
        type: Number
    },
    rewards:{
        type: Number
    }

}, {
    timestamps: true
})


module.exports = mongoose.model('User', userSchema);