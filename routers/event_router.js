const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event_controller');

router.get('/new', eventController.createEvent);

router.post('/', eventController.create);

router.get('/:id',eventController.getEvent);

router.delete('/:id',eventController.delete);

router.get('/:id/edit/', eventController.editPage);

router.post('/:id/edit/',eventController.edit);

router.get('/:id/join',eventController.join);

// router.get('/', eventController.listEvents);
//
// router.get('/new/confirm', eventController.confirm);


//
// router.get('new/confirm', eventController.confirm);



module.exports = router;
