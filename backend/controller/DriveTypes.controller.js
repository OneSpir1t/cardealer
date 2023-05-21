const db = require('../config/db.config');
const DriveTypes = db.driveTypes;

exports.findAll = (req, res) => {
    DriveTypes.findAll().then(drivetypes => {
        res.send(drivetypes)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}