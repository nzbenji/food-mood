const path = require('path')
const express = require('express')
const server = express()

//CHANGE ME
const changeMee = require('./routes/users')
const changeMe = require('./routes/auth')

server.use('/api/v1/users', changeMee)
server.use('/api/v1/auth', changeMe)


server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

module.exports = server
