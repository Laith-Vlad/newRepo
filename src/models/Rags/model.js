'use strict'

const rags = (sequelize,DataTypes) => sequelize.define('rags', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
    ,
    brand:{
        type: DataTypes.STRING
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

module.exports = rags;