'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Place extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Place.belongsTo(models.User)
        }
    };
    Place.init({
        name: DataTypes.STRING,
        lat: DataTypes.STRING,
        lng: DataTypes.STRING,
        user_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Place',
        timestamps: true,
    });
    return Place;
};