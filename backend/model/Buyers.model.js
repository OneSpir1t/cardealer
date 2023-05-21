module.exports = (sequelize, Sequelize) => {
    const Buyers = sequelize.define('buyers', {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },   
        LastName:{
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        FirstName:{
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        Patronymic:{
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        Birthday:{
            type: Sequelize.DataTypes.DATEONLY,
            allowNull: true
        },
        Passport:{
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true
        },
        Address:{
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        Phone:{
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: false,
        freezeTableName: true
    })
    return Buyers
}