const Route = require('express')
const route = new Route()
const Models = require('../controller/Models.controller')

route.get('/', Models.findAll)

module.exports = route