'use strict'

const { Sequelize, DataTypes } = require("sequelize");
const DataCollection = require("./data-collection");
const userModel = require("./users/model");
const sofaModal = require("./Sofa/model");
const ragsModal = require("./Rags/model");
const curtainsModal = require("./Curtains/model");
const washingmachineModal = require("./WashingMachine/model");



const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';
const sequelize = new Sequelize(DATABASE_URL);


const users = userModel(sequelize, DataTypes)
const sofa = sofaModal(sequelize, DataTypes)
const rags = ragsModal(sequelize, DataTypes)
const curtains = curtainsModal(sequelize, DataTypes)
const washingmachine = washingmachineModal(sequelize, DataTypes)

users.associate({ sofa });

module.exports = {
    db: sequelize,
    users: new DataCollection(users),
    sofa: new DataCollection(sofa),
    rags: new DataCollection(rags),
    curtains: new DataCollection(curtains),
    washingmachine: new DataCollection(washingmachine)
} 