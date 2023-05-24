module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define('users', {
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
            allowNull: true
        },
        Login:{
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        UserRoleId:{
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        timestamps: false,
        freezeTableName: true
    })
    return Users
}