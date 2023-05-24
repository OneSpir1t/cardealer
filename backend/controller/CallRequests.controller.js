const { DATEONLY } = require('sequelize');
const db = require('../config/db.config')
const CallRequests = db.callrequests;
const Users = db.users

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
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    const UserBuyer = await Users.create({FirstName: FirstName, Phone: Phone, UserRoleId: 4})
    CallRequests.create({
        BuyerID: UserBuyer.id, EquipmentID: Equipment, StatusID: 1, DateRequest: today,
    }).then(callrequest => {
        res.send(callrequest)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}
