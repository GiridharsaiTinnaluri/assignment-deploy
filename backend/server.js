const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');

const connectDB = require('./config/dbConnection');
const errorHandler = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const habitRoutes  = require('./routes/habitsRoute');

const PORT  = process.env.PORT ;
const app = express();

// Parsing Request Body
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//redirecting Routes
app.use('/api/user', userRoutes);
app.use('/api/habits', habitRoutes);

// sending frontend files
if(process.env.ENVI === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, '../', 
    'frontend', 'build', 'index.html')))
}

// Handling Errors Middleware
app.use(errorHandler);

// Connecting to MongoDB
// and listening to server
 connectDB().then(() => {

    // Listening the server
    app.listen(PORT, (err) => {
        console.log('Server is up and Running', PORT);
    })    
})
 .catch(err => {
    console.log(err);
 });


