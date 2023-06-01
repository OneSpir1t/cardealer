const db = require('../config/db.config');
const AvailableCars = db.availableCars;

exports.findAll = (req, res) => {
    AvailableCars.findAll({
        where:{
            CanOrder: 1
        },
        include: [
            {association: 'Equipment', include: [
                {association: 'Models', include: [{association: "Brand"}]},
                {association: 'TechnicalInformation', include: [{association: 'EngineType'}, {association: 'Color'}, {association: 'BodyType'}, {association: 'Transmission'}, {association: 'DriveType'}]}
            ]}
        ]
    }).then(availablecars => {
        res.send(availablecars)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}

exports.findOne = (req, res) => {
    const Id = req.params.Id
    AvailableCars.findAll({
        where:{
            Id: Id,
            CanOrder: 1
        },
        include: [
            {association: 'Equipment', include: [
                {association: 'Models', include: [{association: "Brand"}]},
                {association: 'TechnicalInformation', include: [{association: 'EngineType'}, {association: 'Color'}, {association: 'BodyType'}, {association: 'Transmission'}, {association: 'DriveType'}]}
            ]}
        ]
    }).then(availablecars => {
        res.send(availablecars)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}