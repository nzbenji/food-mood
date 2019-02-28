const path = require('path')
const express = require('express')
const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

// CHANGE ME
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
const emotionRoutes = require('./routes/emotions')
const mealRoutes = require('./routes/meals')

server.use('/api/v1/users', userRoutes)
server.use('/api/v1/auth', authRoutes)
server.use('/api/v1/emotions', emotionRoutes)
server.use('/api/v1/meals', mealRoutes)

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

module.exports = server
