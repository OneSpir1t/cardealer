module.exports = (sequelize, Sequelize) => {
    const CallRequests = sequelize.define('callrequests', {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },   
        BuyerID:{
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        EquipmentID:{
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        StatusID:{
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        }, 
        ManagerID:{
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true
        },
        DateRequest: {
            type: Sequelize.DataTypes.DATEONLY,
            allowNull: true
        },
    
    }, {
        timestamps: false,
        freezeTableName: true
    })
    return CallRequests
}