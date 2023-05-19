const Route = require('express')
const route = new Route()
const BodyTypes = require('../controller/BodyTypes.controller')

route.get('/', BodyTypes.findAll)

module.exports = route