'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Availibility extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Availibility.hasMany(models.Availibility_Slot,{
        foreignKey:'availbilty_id',
        onDelete:'CASCADE'
      })
    }
  }
  Availibility.init({
    date: DataTypes.DATE,
    slot_time_to: DataTypes.TIME,
    slot_time_from: DataTypes.TIME,
    session_length: DataTypes.INTEGER,
    break_bw_session: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Availibility',
  });
  return Availibility;
};