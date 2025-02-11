const { DataTypes } = require('sequelize');
const db = require('../config/database');
const { User } = require('./users')

const Advertisements = db.define('Advertisements', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull:false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
});

//Kapcsolat
User.hasMany(Advertisements, {foreignKey: 'userId'});
Advertisements.belongsTo(User, {foreignKey: 'userId'})

module.exports = { Advertisements };