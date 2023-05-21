const Route = require('express')
const route = new Route()
const Transmissions = require('../controller/Transmissions.controller')

route.get('/', Transmissions.findAll)

module.exports = route