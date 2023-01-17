const mongoose = require('mongoose');

const dailyProgressSchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId
        ,ref: 'User'
        ,required: true
    },
    day:{
        type: String,
        required: true
    },
    month:{
        type: String,
        required: true
    },
    year:{
        type: String,
        required: true
    },
    totalhabits:{
        type: Number,
        required: true
    },
    completedhabits:{
        type: Number,
        required: true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Dailyprogress', dailyProgressSchema);