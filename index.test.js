const {db} = require('./db')
const {Restaurant, Menu} = require('./models/index')
const {
    seedRestaurant,
    seedMenu,
  } = require('./seedData');
describe('Restaurant and Menu Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await db.sync({ force: true });
        const testRestaurants = await Restaurant.bulkCreate(seedRestaurant)
        const testMenus = await Menu.bulkCreate(seedMenu)
    });
    test('can create a Restaurant', async () => {
        const testRest = new Restaurant()
        expect(testRest).toBeInstanceOf(Restaurant)
    });

    test('can create a Menu', async () => {
        const testMenu = new Menu()
        expect(testMenu).toBeInstanceOf(Menu)
    });

    test('can find Restaurants', async () => {
        const allRestaurants = await Restaurant.findAll()
        expect(allRestaurants.length).toBe(3);
    });

    test('can find Menus', async () => {
        const secondMenu = await Menu.findByPk(2)
        expect(secondMenu).toEqual(expect.objectContaining({title: "Lunch"}))
    });

    test('can delete Restaurants', async () => {
        Restaurant.destroy({
            where: {id: 3}
        })
        const allRestaurants = await Restaurant.findAll()
        expect(allRestaurants.length).toEqual(2)
    });
    test('can delete Menus', async () => {
        Menu.destroy({
            where: {title: "Breakfast"}
        })
        const allMenus = await Menu.findAll()
        expect(allMenus.length).toEqual(2)
    });
})
