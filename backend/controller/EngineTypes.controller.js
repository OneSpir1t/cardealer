const db = require('../config/db.config');
const EngineTypes = db.engineTypes;

exports.findAll = (req, res) => {
    EngineTypes.findAll().then(enginetypes => {
        res.send(enginetypes)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}