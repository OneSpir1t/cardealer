module.exports = (sequelize, Sequelize) => {
    const Transmissions = sequelize.define('transmissions', {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },   
        Title:{
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },   
    }, {
        timestamps: false,
        freezeTableName: true
    })
    return Transmissions
}