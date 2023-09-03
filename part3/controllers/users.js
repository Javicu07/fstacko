const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()

const User = require('../models/User')

usersRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, name, password } = body

  // npm install bcrypt for encrypt the password
  const saltRounds = 10 // 'saltRounds' represent the encrypt complex. Up it´s more secure but more time
  const passwordHash = bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })
  //  After created the user, it´s necessary save it
  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter
