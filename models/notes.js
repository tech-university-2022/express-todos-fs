/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Notes.init({
    title: DataTypes.STRING,
    allowNull: true,
  }, {
    description: DataTypes.STRING,
    allowNull: false,
  }, {
    sequelize,
    modelName: 'Notes',
  });
  return Notes;
};
