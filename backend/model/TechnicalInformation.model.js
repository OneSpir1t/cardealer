module.exports = (sequelize, Sequelize) => {
    const TechnicalInformation = sequelize.define('technicalInformation', {
        EngineTypeID: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        ColorID: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        BodyTypeID: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        CountSeats: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        Horsepower: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        Yearofmanufacture: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        TransmissionID: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        Enginedisplacement: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        DriveTypeID: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        timestamps: false,
        freezeTableName: true
    })
    return TechnicalInformation
}