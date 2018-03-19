// lib stuff
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
// app stuff
const app = express()
const articlesRoutes = require('./articles/articles.routes')
const usersRoutes = require('./users/users.routes')

// configure our app
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'layouts'))

// add middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// add routes
app.use('/articles', articlesRoutes)
app.use('/users', usersRoutes)

// return the app
module.exports = app



