const Route = require('express')
const route = new Route()
const Colors = require('../controller/Colors.controller')

route.get('/', Colors.findAll)

module.exports = route