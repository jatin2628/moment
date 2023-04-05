'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Availibility_Slot,{
        foreignKey:'user_id',
        onDelete:'CASCADE'
      })
    }
  }
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    verified:{
      type:DataTypes.INTEGER,
      defaultValue:0
    } 
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};