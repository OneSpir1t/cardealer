const Route = require('express')
const route = new Route()
const Brands = require('../controller/Brands.controller')

route.get('/', Brands.findAll)

module.exports = route