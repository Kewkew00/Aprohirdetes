const express = require('express');
const router = express.Router();
const adsContoller = require('../controllers/ads.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware')

// upload ad
router.post('/upload', authMiddleware, upload.single('file') ,adsContoller.upload);

// delete ad
router.delete('/delete/:id',authMiddleware ,adsContoller.delete);

// get all ad
router.get('/get',authMiddleware ,adsContoller.getAllAd);

// get one ad by id
router.get('/get/:id',authMiddleware ,adsContoller.getOneAd);

module.exports = router