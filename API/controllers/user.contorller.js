const userService = require('../services/user.service');

exports.register = async (req, res, next) => {
    try{
        const { name,address ,email, password } = req.body;
        if ( !name || !email || !password){
            return res.status(400).json({ message: 'Hiányzó adatok!'});
        }
        const user = await userService.registerUser(name, address ,email, password);
        res.status(201).json({success: true, message: "Sikeres regisztráció!"});
    }catch(error){
        next(error);
    }
}

exports.login = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        if (!email || !password){
            return res.status(400).json({ message: 'Hiányzó adatok!'});
        }
        const user = await userService.loginUser(email, password);
        res.status(200).json({user, message: 'Sikeres bejelentkezés!'});
    }catch(error){
        next(error);
    }
}