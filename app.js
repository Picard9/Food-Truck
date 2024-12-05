
const express = require('express')
const app = express()
const port = 3000


// Allow us to send json
app.use(express.json())
// Allow us to respond with static webpages
app.use(express.static('public'))

// Attatch Endpoints
app.use('/api/v1/menu', require('./routes/api/v1/menu'))
app.use(require('./routes/static'))




app.listen(port, () => console.log(`http://localhost:${port}/`))
