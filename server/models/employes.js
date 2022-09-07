const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

// Notre model de données pour les employés
const Employes = sequelize.define("employes", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    firstName: DataTypes.STRING,
    dateCreated: DataTypes.DATE,
    department: DataTypes.STRING,
    checkIn: DataTypes.DATE,
    checkOut: DataTypes.DATE,
    comment: DataTypes.STRING,
    workingHours: DataTypes.INTEGER
}, {timestamps: false});


module.exports = Employes;