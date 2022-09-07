const {Sequelize} = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const Employes = require('./models/employes');

return sequelize.authenticate()
    .then(result => {
        console.log(`SQLite successfully connected!`);
        return Employes.sync();
    })
    .then(result => {
        console.log(`Employees table created`);
        return result;
    })
    .catch(error => {
        console.error('Unable to connect to SQLite database:', error);
    })