module.exports = (sequelize, Sequelize) => {
    const BodyTypes = sequelize.define('bodytypes', {
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
    return BodyTypes
}