module.exports = (sequelize, Sequelize) => {
    const Available_Cars = sequelize.define('available_cars',{     
        id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },         
        EquipmentID: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        VIN: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        MileAge: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        Owners: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        }
        
    }, {
        timestamps: false,
        freezeTableName: true 
    })
    return Available_Cars
}