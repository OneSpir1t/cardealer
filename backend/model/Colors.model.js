module.exports = (sequelize, Sequelize) => {
    const Colors = sequelize.define('colors', {
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
    return Colors
}