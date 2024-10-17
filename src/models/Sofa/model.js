'use strict'

// Sofa model
const sofa = (sequelize, DataTypes) => sequelize.define('sofa', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER, // Assuming userId is an integer
        allowNull: false,
        references: {
            model: 'Users', // Refers to the 'Users' model
            key: 'id' // The column of Users table
        }
    }
});
module.exports = sofa;