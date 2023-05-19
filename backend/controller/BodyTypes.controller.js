const db = require('../config/db.config');
const BodyTypes = db.bodyTypes;

exports.findAll = (req, res) => {
    BodyTypes.findAll().then(bodyTypes => {
        res.send(bodyTypes)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}