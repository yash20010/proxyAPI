const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 5000

// Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})

app.use(limiter)
app.set('trust proxy', 1) // trust first proxy

app.use(express.static('public'))

app.use(cors())

app.use('/api', require('./routes'))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
