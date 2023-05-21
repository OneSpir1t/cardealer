const { DATEONLY } = require('sequelize');
const db = require('../config/db.config')
const CallRequests = db.callrequests;
const Buyers = db.buyers

exports.findAll = (req, res) => {
    CallRequests.findAll().then(callrequest => {
        res.send(callrequest)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}

exports.createWithUser = async (req, res) => {
    const FirstName = req.params.Name
    const Phone = req.params.Phone
    const Equipment = req.params.Equipment
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    const Buyer = await Buyers.create({FirstName: FirstName, Phone: Phone})
    CallRequests.create({
        BuyerID: Buyer.id, EquipmentID: Equipment, StatusID: 1, DateRequest: today,
    }).then(callrequest => {
        res.send(callrequest)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}
