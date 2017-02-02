const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/'})

router.get('/:username',profileController.getProfilePage)

router.get('/:username/upload')

router.get('/:username/edit',profileController.getEditPage)
// router.post('/:username/upload', upload.single('avatar'), function (req, res, next) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
// })


module.exports = router;
