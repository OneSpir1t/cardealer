const db = require('../config/db.config')
const Brands = db.brands;

exports.findAll = (req, res) => {
    Brands.findAll().then(equipments => {
        res.send(equipments)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}
