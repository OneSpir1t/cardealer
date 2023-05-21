const Route = require('express')
const route = new Route()
const DriveTypes = require('../controller/DriveTypes.controller')

route.get('/', DriveTypes.findAll)

module.exports = route