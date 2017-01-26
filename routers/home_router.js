const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/:username',homeController.showHomepage);

router.get('/:username/previous',homeController.showPreviousEvents);

router.get('/:username/eventlist',homeController.showListOfEvents);
module.exports = router;
