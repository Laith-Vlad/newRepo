'use strict'

const fridges = (sequelize,DataTypes) => sequelize.define('fridges', {
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

module.exports = fridges;