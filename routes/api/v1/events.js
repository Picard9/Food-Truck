

const router = require('express').Router()

const { response } = require('express')
const { getCollection, ObjectId } = require('../../../dbconnect')

let collection = null
const getEvents = async () => {
    if (!collection) collection = await getCollection('FoodTruckAPI', 'Events')
    return collection
}

// API Routes

router.get('/', async (request, response) => {
    const events = await getEvents()
    const foundEvents = await events.find().toArray()
    if (foundEvents) response.send(foundEvents)
    else response.send({ error: { message: `Could not find events` }})
})

module.exports = router