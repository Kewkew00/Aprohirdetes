const { User } = require('../models/users');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token');

exports.registerUser = async (name,address, email ,password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        address,
        email,
        password: hashedPassword,
    });

    return user;
}

exports.loginUser = async (email, password) => {
    const user = await User.findOne({where: { email }});

    if (!user) throw new Error('Nem regisztrált felhasználó!');

    if (!await bcrypt.compare(password, user.password)) throw new Error('Hibás jelszó!');

    const token = generateToken({ id: user.id, address: user.address ,name: user.name, email: user.email});
    
    return { token }; 
}