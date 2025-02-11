const { Advertisements } = require('../models/advertisements');
const { where } = require('sequelize');

exports.uploadAd = async (date, category, title, description, price, image, userId) => {

    const ad = await Advertisements.create({
        date,
        category,
        title,
        description,
        price,
        image,
        userId
    });

    return ad;
}

exports.deleteAd = async (id) => {
    const ad = await Advertisements.destroy({where: {id}});

    if (!ad) throw new Error('Hirdetés nem található!');

    return "Hirdetés törölve!";
}

exports.getAllAds = async () => {
    return await Advertisements.findAll();
}

exports.getAdById = async () => {
    return await User.findOne({where: {id}});
}