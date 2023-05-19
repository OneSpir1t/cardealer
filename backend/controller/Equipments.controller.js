const { Sequelize } = require('sequelize');
const db = require('../config/db.config')
const Equipments = db.equipments;

exports.findAll = (req, res) => {
    const limit = parseInt(req.query._limit) || 1000
    const page = parseInt(req.query._page) || 1
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    Equipments.findAll({
        where: {
            CanOrder: 1
        },
        include: [
            {association: 'Models', include: [{association: "Brand"}]},
            {association: 'TechnicalInformation', include: [{association: 'EngineType'}, {association: 'Color'}, {association: 'BodyType'}, {association: 'Transmission'}, {association: 'DriveType'}]}
        ]
    }).then(equipments => {

        res.set('X-Total-Count', equipments.length)
        equipments = equipments.slice(startIndex, endIndex)
        res.send(equipments)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}

exports.findOne = (req, res) => {
    const Id = req.params.Id
    console.log(res.Brand)
    Equipments.findAll({
        where: {
            CanOrder: 1,
            id: Id
        },
        include: [
            {association: 'Models' , include: [{association: "Brand"}] },
            {association: 'TechnicalInformation', include: [{association: 'EngineType'}, {association: 'Color'}, {association: 'BodyType'}, {association: 'Transmission'}, {association: 'DriveType'}]}
        ]
    }).then(equipment => {
        res.send(equipment)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}