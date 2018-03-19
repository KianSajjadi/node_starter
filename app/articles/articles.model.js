const sequelize = require('../../db')
const Sequelize = require('sequelize')

const Article = sequelize.define('articles', {
  title: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.TEXT
  }
})


// force: true will drop the table if it already exists*
Article.sync().then(() => {
  console.log('successfully created Articles table')
})

module.exports = Article