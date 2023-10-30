const {db} = require('../db');
const { Sequelize, DataTypes, Model } = require('sequelize');

const Menu = db.define("Menu", {
    title: DataTypes.STRING
})
module.exports = {Menu};