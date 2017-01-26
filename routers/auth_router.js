const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth_controller');


router.post('/signup', authController.signup);
router.post('/login',authController.login);
router.post('/login/facebook',authController.loginFacebook);

router.get('/logout',authController.logout);


module.exports = router;
