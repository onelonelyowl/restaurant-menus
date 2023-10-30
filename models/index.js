const {Restaurant} = require('./Restaurant')
const {Menu} = require('./Menu')
const testRestaurants = new Restaurant()
        //testRestaurants.create({name: "name", location: "londinium", cuisine: "quaseen"})
console.log(testRestaurants)
module.exports = { Restaurant, Menu }
