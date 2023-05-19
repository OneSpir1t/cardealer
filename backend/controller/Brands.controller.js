const db = require('../config/db.config')
const Brands = db.brands;

exports.findAll = (req, res) => {
    Brands.findAll().then(brands => {
        res.send(brands)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}
