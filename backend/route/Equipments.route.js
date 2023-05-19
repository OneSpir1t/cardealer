const Route = require('express')
const route = new Route()
const Equipments = require('../controller/Equipments.controller')

route.get('/', Equipments.findAll)

route.get('/:Id', Equipments.findOne)

module.exports = route