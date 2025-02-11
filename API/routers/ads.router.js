const express = require('express');
const router = express.Router();
const adsContoller = require('../controllers/ads.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

// upload ad
router.post('/upload',authMiddleware ,adsContoller.upload);

// delete ad
router.post('/delete',authMiddleware ,adsContoller.delete);

// get all ad
router.post('/',authMiddleware ,adsContoller.getAllAd);

// get one ad by id
router.post('/:id',authMiddleware ,adsContoller.getOneAd);

module.exports = router