const db = require('../config/db.config')
const Transmissions = db.transmissions;

exports.findAll = (req, res) => {
    Transmissions.findAll().then(transmission => {
        res.send(transmission)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}
