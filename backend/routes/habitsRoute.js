const router = require('express').Router();

const authenticate =  require('../middleware/authMiddleware');
const {
    getHabit,
    creatHabit,
    UpdateHabit,
    deleteHabit,
    getCurrentDayHabits,
    getUserAllHabits,
    createDailyPosts
} = require('../controllers/habitController');


router.get('/habit/:habitid', authenticate, getHabit);
router.post('/createHabit', authenticate, creatHabit);
router.put('/updateHabit', authenticate, UpdateHabit);
router.delete('/deleteHabit/:habitid', authenticate, deleteHabit);
router.post('/userAllHabits/:userid', authenticate, getUserAllHabits);
router.get('/userTodayHabits', authenticate, getCurrentDayHabits);
router.post('/dailyProgress', authenticate, createDailyPosts)

module.exports = router;
