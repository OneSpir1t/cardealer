const Sequelize = require('sequelize');

const sequelize = new Sequelize('cardealer', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'root',
    database: 'cardealer'
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.availableCars = require('../model/AvailableCars.model')(sequelize, Sequelize)
db.equipments = require('../model/Equipments.model')(sequelize, Sequelize)
db.bodyTypes = require('../model/BodyTypes.model')(sequelize, Sequelize)
db.brands = require('../model/Brands.model')(sequelize, Sequelize)
db.colors = require('../model/Colors.model')(sequelize, Sequelize)
db.driveTypes = require('../model/DriveType.model')(sequelize, Sequelize)
db.engineTypes = require('../model/EngineTypes.model')(sequelize, Sequelize)
db.models = require('../model/Models.model')(sequelize, Sequelize)
db.technicalInformation = require('../model/TechnicalInformation.model')(sequelize, Sequelize)
db.transmissions = require('../model/Transmissions.model')(sequelize, Sequelize)
db.callrequests = require('../model/CallRequests.model')(sequelize, Sequelize)
db.buyers = require('../model/Buyers.model')(sequelize, Sequelize)


db.technicalInformation.belongsTo(db.engineTypes, {as: 'EngineType', foreignKey: 'EngineTypeID'})
db.technicalInformation.belongsTo(db.colors, {as: 'Color', foreignKey: 'ColorID'})
db.technicalInformation.belongsTo(db.bodyTypes, {as: 'BodyType', foreignKey: 'BodyTypeID'})
db.technicalInformation.belongsTo(db.transmissions, {as: 'Transmission', foreignKey: 'TransmissionID'})
db.technicalInformation.belongsTo(db.driveTypes, {as: 'DriveType', foreignKey: 'DriveTypeID'})
db.models.belongsTo(db.brands, {as: 'Brand', foreignKey: 'BrandID'})
db.equipments.belongsTo(db.models, {as: 'Models', foreignKey: 'ModelID'})
db.equipments.belongsTo(db.technicalInformation, {as: 'TechnicalInformation', foreignKey: 'TechnicalInformationID'})
db.availableCars.belongsTo(db.equipments, {as: 'Equipment', foreignKey: 'EquipmentID'})

async function con(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');       
      } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

con();

module.exports = db;