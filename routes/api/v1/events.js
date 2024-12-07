

const router = require('express').Router()

const { response } = require('express')
const { getCollection, ObjectId } = require('../../../dbconnect')

let collection = null
const getEvents = async () => {
    if (!collection) collection = await getCollection('FoodTruckAPI', 'Events')
    return collection
}

// API Routes 

router.get('/events', async (request, response) => {
    const events = await getEvents()
    const foundEvents = await events.find().toArray()
    if (foundEvents) response.send(foundEvents)
    else response.send({ error: { message: `Could not find events` }})
})

router.get('/events/:id', async (request, response) => {
    const id = request.params

    const events = await getEvents()
    const foundEvents = await events.findOne({_id: new ObjectId(id)})
    if (foundEvents) response.send(foundEvents)
    else response.send({ error: { message: `Could not find event with id: ${id}` }})
})

router.post('/events', async (request, response) => {
    const { name, location, date, time } = request.body

    const events = await getEvents()
    const inserted = await events.insertOne({ name, location, date, time })
    response.send(inserted)
})

module.exports = router