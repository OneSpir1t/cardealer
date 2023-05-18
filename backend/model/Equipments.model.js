module.exports = (sequelize, Sequelize) =>{
    const Equipments = sequelize.define('equipments',{     
        id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },         
        ModelID: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        TechnicalInformationID: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        Title: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        Cost: {
            type: Sequelize.DataTypes.DOUBLE,
            allowNull: false
        },
        Image: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
    }, {
        timestamps: false,
        freezeTableName: true 
    })
    return Equipments
}