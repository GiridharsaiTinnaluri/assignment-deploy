const mongoose = require('mongoose');

const progressSchema = mongoose.Schema({
    day: {
        type: String,
        required: true
    },
    tasksCompleted:{
        type: Number,
        required: true
    },
    totalTasks:{
        type: Number,
        required: true
    },
    completedTaskIds:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Habits'
        }
    ],
    pendingTaskIds:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Habits'
        }
    ],
    percentageCompleted:{
        type: Number
    }

}, {
    timestamps: true
})


module.exports = mongoose.model('User', progressSchema);