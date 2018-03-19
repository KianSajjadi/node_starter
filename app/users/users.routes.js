const express = require('express')
const router = new express.Router()
const User = require('./users.model')

router.get('/', (req, res) => {
  User.findAll().then(users => {
      res.send('Got some users!')
  })
})

module.exports = router