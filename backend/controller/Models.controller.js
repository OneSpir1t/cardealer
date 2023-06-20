const db = require('../config/db.config');
const Models = db.models;

exports.findAll = (req, res) => {
    Models.findAll({
        include: [
            {association: 'Brand'}
        ]
    }).then(model => {
        res.send(model)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}