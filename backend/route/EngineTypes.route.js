const Route = require('express')
const route = new Route()
const EngineTypes = require('../controller/EngineTypes.controller')

route.get('/', EngineTypes.findAll)

module.exports = route