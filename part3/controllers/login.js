// 'npm install jsonwebtoken' for use codified JSON
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')

loginRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body

  const user = await User.findOne({ username }) //  Find the user
  const passwordCorrect = user !== null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    response.status(401).json({
      error: 'invalid user or password'
    })
  }

  const userForToken = {
    id: user._id,
    username: user.username
  }

  // Building the token
  const token = jwt.sign(
    userForToken,
    process.env.SECRET, // The second parameter is the secret word for token
    {
      expiresIn: 60 * 60 * 24 * 7 // The token expires in seven days. It´s need logged again
    })

  response.send({
    name: user.name,
    username: user.username,
    token
  })
})

module.exports = loginRouter
