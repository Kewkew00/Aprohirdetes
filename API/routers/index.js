const express = require('express');
const router = express.Router();

router.use('/users', require('./user.router'));
router.use('/ads', require('./ads.router'));

module.exports = router;