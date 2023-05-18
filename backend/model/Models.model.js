module.exports = (sequelize, Sequelize) => {
    const Models = sequelize.define('models', {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },   
        BrandID:{
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        Title:{
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        Description:{
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        Video:{
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
    }, {
        timestamps: false,
        freezeTableName: true
    })
    return Models
}