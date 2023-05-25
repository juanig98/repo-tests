const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sepagos', 'user', 'pass', {
    dialect: 'sqlite', host: './sepagos.sqlite'
})
 
module.exports = sequelize;