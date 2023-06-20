const express = require('express');
const cors = require('cors')

const app = express()

const Router = express.Router()

app.use(cors())

const Equipments = require('./route/Equipments.route')
const Brands = require('./route/Brands.route')
const BodyTypes = require('./route/BodyTypes.route')
const EngineTypes = require('./route/EngineTypes.route')
const Colors = require('./route/Colors.route')
const Transmissions = require('./route/Transmissions.route')
const DriveTypes = require('./route/DriveTypes.route')
const AvailableCars = require('./route/AvailableCars.route')
const CallRequests = require('./route/CallRequests.route')
const Models = require('./route/Models.route')

app.use('/Equipments', Equipments)

app.use('/Brands', Brands)

app.use('/BodyTypes', BodyTypes)

app.use('/EngineTypes', EngineTypes)

app.use('/Colors', Colors)

app.use('/Transmissions', Transmissions)

app.use('/DriveTypes', DriveTypes)

app.use('/AvailableCars', AvailableCars)

app.use('/CallRequests', CallRequests)

app.use('/Models', Models)

app.listen(3000, () => console.log('server running at: http://localhost:3000'));