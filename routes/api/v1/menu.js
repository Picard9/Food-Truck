//Imports and Setup

const router = require('express').Router()

const { response } = require('express')

const { getCollection, ObjectId } = require('../../../dbconnect')

//Getting the Menu Items Collection

let collection = null
const getMenuItems = async () => {
    if (!collection) collection = await getCollection('FoodTruckAPI', 'MenuItems')
    return collection
}

// API Routes 

//Get All Menus: get /api/v1/menu
router.get('/menu', async (request, response) => {
    const menus = await getMenuItems()
    const foundMenus = await menus.find().toArray()
    if (foundMenus) response.send(foundMenus)
    else response.send({ error: { message: `Could not find menus` }})
})

//Get Menu by ID: get api/v1/menu/:id
router.get('/menu/:id', async (request, response) => {
    const id = request.params

    const menus = await getMenuItems()
    const foundMenus = await menus.findOne({_id: new ObjectId(id)})
    if (foundMenus) response.send(foundMenus)
    else response.send({ error: { message: `Could not find menu with id: ${id}` }})
})

//Add a Menu: post /api/v1/menu
router.post('/menu', async (request, response) => {
    const {name, description, price, image} = request.body

    const menus = await getMenuItems()
    const inserted = await menus.insertOne({name, description, price, image })
    response.send(inserted)
})

module.exports = router //Module Export