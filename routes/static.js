const path = require('path')
const router = require('express').Router()

const root = path.join(__dirname, '..', 'public')

router.get('/', (request, response) => {
    response.sendFile('index.html', { root })
})

router.get('/event/:id', (request, response) => {
    response.sendFile('NewPageEvents.html', { root })

})

router.get('/admin', (request, response) => {
    response.sendFile('admin.html', { root })

})

module.exports = router