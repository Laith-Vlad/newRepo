'use strict'

const curtains = (sequelize,DataTypes) => sequelize.define('curtains', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
    ,
    brand:{
        type: DataTypes.STRING,
        allowNull: true
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false
    },
    url:{
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = curtains;