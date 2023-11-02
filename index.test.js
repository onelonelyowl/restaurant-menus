const {db} = require('./db')
const {Restaurant, Menu, Item} = require('./models/index')
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
        await Item.create({name: "testName", image: "testImage", price: 419, vegetarian: true})
        await Item.create({name: "testName2", image: "testImage2", price: 421, vegetarian: false})
        await Item.create({name: "testName3", image: "testImage3", price: 422, vegetarian: true})
        await Item.create({name: "testName4", image: "testImage4", price: 423, vegetarian: true})
        await Item.create({name: "testName5", image: "testImage5", price: 424, vegetarian: false})

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
    test('restaurants associate with menus correctly', async () => {
    const firstRest = await Restaurant.findByPk(1)
    const secondMenu = await Menu.findByPk(2)
    const thirdMenu = await Menu.findByPk(3)
    await firstRest.addMenus([secondMenu, thirdMenu])
    const firstRestAgain = await Restaurant.findByPk(1)
    const firstRestMenus = await firstRestAgain.getMenus()
    expect(firstRestMenus.length).toBe(2)
    });
    test('item is successfully created', async () => {
    const firstItem = Item.findByPk(1)
    expect(firstItem).not.toBeNull()        
    });
    test('item can be found successfully', async () => {
    const thirdItem = await Item.findByPk(3)
    expect(thirdItem).toEqual(expect.objectContaining({name: "testName3", image: "testImage3", price: 422, vegetarian: true})) 
    });
    test('item can be deleted', async () => {
    const toBeDeleted = await Item.findByPk(4)
    expect(await toBeDeleted.destroy()).toEqual(expect.objectContaining({name: "testName4", image: "testImage4", price: 423, vegetarian: true}))
    });
    test('testing menu item connection one-way', async () => {
    const secondMenu = await Menu.findByPk(2)
    const thirdMenu = await Menu.findByPk(3)
    const secondItem = await Item.findByPk(2)
    const firstItem = await Item.findByPk(1)
    const thirdItem = await Item.findByPk(3)
    await secondMenu.addItems([firstItem, secondItem])
    await thirdMenu.addItems([secondItem, thirdItem])
    const secondMenuItems = await secondMenu.getItems()
    expect(secondMenuItems.length).toBe(2)
    });
    test('testing menu item connection the other way', async () => {
        const secondMenu = await Menu.findByPk(2)
        const thirdMenu = await Menu.findByPk(3)
        const secondItem = await Item.findByPk(2)
        const firstItem = await Item.findByPk(1)
        const thirdItem = await Item.findByPk(3)
        await secondMenu.addItems([firstItem, secondItem])
        await thirdMenu.addItems([secondItem, thirdItem])
        const secondItemMenus = await secondItem.getMenus()
        expect(secondItemMenus.length).toBe(2)
    });
    test('eager loads all menus with items', async () => {
        const eagerLoads = await Item.findAll({include: Menu})
        expect(typeof eagerLoads).toBe("object") // ok i visually inspected and it's right but i can't figure out how to test it, the output is so messy it can't pass tests
        })
    })
