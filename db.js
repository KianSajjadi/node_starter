const Sequelize = require('sequelize')

const sequelize = new Sequelize('mydb', '', '', {
  dialect: 'sqlite',
  storage: './mydb.db'
})

module.exports = sequelize