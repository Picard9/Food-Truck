

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

//  THIS REPLACED THE COMMENTED CODE BELLOW

router.get('/events/:id', async (request, response) => {
    const { id } = request.params

    // Validate the ObjectId
    if (!ObjectId.isValid(id)) {
        return response.send({ error: { message: `Invalid event ID: ${id}` } })
    }

    const events = await getEvents()
    const foundEvent = await events.findOne({ _id: new ObjectId(id) })
    
    if (foundEvent) {
        response.send(foundEvent)
    } else {
        response.send({ error: { message: `Could not find event with id: ${id}` } })
    }
})

//  THIS COMMENTED CODE HAD AN ISSUE RELATED TO THE MONGODB ID (OjectId)


// router.get('/events/:id', async (request, response) => {
//     const { id } = request.params

//     const events = await getEvents()
//     const foundEvents = await events.findOne({_id: new ObjectId(id)})
//     if (foundEvents) response.send(foundEvents)
//     else response.send({ error: { message: `Could not find event with id: ${id}` }})
// })

router.post('/events', async (request, response) => {
    const { name, location, date, time } = request.body

    const events = await getEvents()
    const inserted = await events.insertOne({ name, location, date, time })
    response.send(inserted)
})


module.exports = router