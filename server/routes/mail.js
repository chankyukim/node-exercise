const express = require('express');
const router = express.Router();
const mailController = require('../controllers/mailController');

router.post('/', mailController.sendMailHandle);

module.exports = router;
