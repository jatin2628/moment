'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Availibility_Slot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Availibility_Slot.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });

      Availibility_Slot.belongsTo(models.Availibility, {
        foreignKey: 'availbilty_id',
        onDelete: 'CASCADE'
      });
    }
  }
  Availibility_Slot.init({
    user_id: DataTypes.INTEGER,
    availbilty_id: DataTypes.INTEGER,
    slot_start: DataTypes.STRING,
    slot_end: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Availibility_Slot',
  });
  return Availibility_Slot;
};