const db = require('../config/db.config');
const Colors = db.colors;

exports.findAll = (req, res) => {
    Colors.findAll().then(color => {
        res.send(color)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}