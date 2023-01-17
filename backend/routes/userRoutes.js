const router = require('express').Router();

const {registerUser, loginUser} = require('../controllers/userController'); 

// router.get('/',(req, res) => {
//     res.status
//     res.status(200).json({message: "hello World"})
// })
router.post('/register', registerUser);
router.post('/login', loginUser);


module.exports = router;