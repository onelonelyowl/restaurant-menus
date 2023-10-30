const {db} = require('./db')
const {Restaurant, Menu} = require('./models/index')
const {
    seedRestaurant,
    seedMenu,
  } = require('./seedData');

(async () => {
    await db.sync({ force: true });
    const testRest = await Restaurant.create({name: "jeff", location: "crystal", cuisine: "hunter"})
    const testRest2 = await Restaurant.create({name: "name2", location: "location2", cuisine:"cuisine2"})
    const allRestaurants = await Restaurant.findAll()
    console.log(testRest.toJSON())
    console.log(testRest2.toJSON())
    console.log(allRestaurants)
  })();
