const mongoose = require('mongoose');

const habitSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    days:[String],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Habits', habitSchema);