const sequelize = require('../../db')
const Sequelize = require('sequelize')

const User = sequelize.define('users', {
  name: {
    type: Sequelize.STRING
  },
  penisSize: {
    type: Sequelize.INTEGER
  }
})


// force: true will drop the table if it already exists*
User.sync().then(() => {
  console.log('successfully created Users table')
})

module.exports = User