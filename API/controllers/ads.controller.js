const adsService = require('../services/ads.service');
const upload = require('../middlewares/upload.middleware')

exports.upload = async (req, res, next) => {
    try{

        console.log('Body:', req.body);
        console.log('File:', req.file);
        // Ellenőrizzük, hogy van-e feltöltött fájl
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Nem található feltöltött fájl.',
            });
        }

        // Feltöltött fájl adatai
        const file = req.file;




        const { date, category, title, description, price, userId } = req.body;
        const image = req.file ? req.file.filename : null;
      //  upload.single(image);

        if ( !date || !category || !title || !description || !price){
            return res.status(400).json({ message: 'Hiányzó adatok!'});
        }
        const ad = await adsService.uploadAd(date, category, title, description, price, image, userId);
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