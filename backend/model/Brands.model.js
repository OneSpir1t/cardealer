module.exports = (sequelize, Sequelize) => {
    const Brands = sequelize.define('brands', {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },   
        CountryID:{
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        Title:{
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        }
    
    }, {
        timestamps: false,
        freezeTableName: true
    })
    return Brands
}