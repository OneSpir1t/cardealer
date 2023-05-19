const express = require('express');
const cors = require('cors')

const app = express()

const Router = express.Router()

app.use(cors())

const Equipments = require('./route/Equipments.route')
const Brands = require('./route/Brands.route')
const BodyTypes = require('./route/BodyTypes.route')

app.use('/Equipments', Equipments)

app.use('/Brands', Brands)

app.use('/BodyTypes', BodyTypes)

app.listen(3000, () => console.log('server running at: http://localhost:3000'));