const adsService = require('../services/ads.service');

exports.upload = async (req, res, next) => {
    try{
        const { date, category, title, description, price, image } = req.body;
        if ( !date || !category || !title || !description || !price){
            return res.status(400).json({ message: 'Hiányzó adatok!'});
        }
        const ad = await adsService.uploadAd(date, category, title, description, price, image);
        res.status(201).json({success: true, message: "Hirdetés közzétéve!"});
    }catch(error){
        console.log(error)
        next(error);
    }
}

exports.delete = async (req, res, next) => {
    try{
        if (!req.params.id)
        {
            return res.status(400).json({ message: 'Hiányzó hirdetés azonosító!'});
        }
        
        const ad = await adsService.deleteAd(req.params.id);
        
        res.status(200).json({success:true, results: ad});
    }catch(error){
        next(error);
    }
}

exports.getAllAd = async (req, res, next) => {
    try{
        const ad = await adsService.getAllAds();
        res.status(200).json({success:true, results: ad});
    }catch(error){
        next(error);
    }
}

exports.getOneAd = async (req, res, next) => {
    try{
        if (!req.params.id)
        {
            return res.status(400).json({ message: 'Hiányzó hirdetés azonosító!'});
        }

        const ad = await adsService.getAdById(req.params.id);

        res.status(200).json({success:true, results: ad});
    }catch(error){
        next(error);
    }
}