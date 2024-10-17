'use strict'

const washingmachine = (sequelize,DataTypes) => sequelize.define('washingmachine', {
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


module.exports = washingmachine;