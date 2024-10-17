'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { password } = require('pg/lib/defaults');

const SECRET = process.env.SECRET || 'secretstring';

const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define('Users', {

    username: { type: DataTypes.STRING, required: true, unique: true },
    email: { type: DataTypes.STRING, required: false, unique: true },
    password: { type: DataTypes.STRING, required: true },
    role: { type: DataTypes.ENUM('user', 'writer', 'editor', 'admin'), required: true, defaultValue: 'user'},





    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username}, SECRET);
      },
      set(tokenObj) {
        let token = jwt.sign(tokenObj, SECRET);
        return token;
      }
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          user: ['read'],
          writer: ['read', 'create'],
          editor: ['read', 'create', 'update'],
          admin: ['read', 'create', 'update', 'delete']
        };
        return acl[this.role];
      }
    }
  });


  model.associate = (models) => {
    model.hasMany(models.sofa, {
      foreignKey: 'userId', // Foreign key in the sofa table
      as: 'sofas', // Alias for easier access
    });
  };

  model.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;
  });

  model.authenticateBasic = async function (email, password) {
    try {
      const user = await this.findOne({ where: { email:email } });
      const valid = await bcrypt.compare(password, user.password);
      console.log(user)
      if (valid) { return user; }
      throw new Error('Invalid User');
      
      
    } catch (error) {
      throw new Error(e.message)
    }
  };
  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const user = this.findOne({where: { username: parsedToken.username } });
      if (user) { return user; }
      throw new Error("User Not Found");
    } catch (e) {
      throw new Error(e.message)
    }
  };

  return model;
}

module.exports = userModel;
