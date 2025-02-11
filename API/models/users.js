const { DataTypes } = require('sequelize');
const db = require('../config/database');

const User = db.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(100),
        allowNull:false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
});

module.exports = { User };