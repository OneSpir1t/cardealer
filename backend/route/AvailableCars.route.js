const Route = require('express')
const route = new Route()
const AvailableCars = require('../controller/AvailableCars.controller')

route.get('/', AvailableCars.findAll)

route.get('/:Id', AvailableCars.findOne)

module.exports = route