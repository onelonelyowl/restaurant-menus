const {db} = require('../db');
const { Sequelize, DataTypes, Model } = require('sequelize');

const Restaurant = db.define("Restaurant", {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    cuisine: DataTypes.STRING
})
module.exports = {Restaurant};