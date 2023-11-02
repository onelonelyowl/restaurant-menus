const path = require('path');
const { Sequelize } = require('sequelize');

const db = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
    define: {
        timestamps: false,
    },
    logging: false,
})

module.exports = {
    db
};
