const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()

const User = require('../models/User')

/*
"populate('notes')" it´s like a "join('notes')" but it´s not the same because it´s not transactional,
no block the notes in the database, can be differences between the GET and the database collection
*/
/*
By default "populate('notes')" return all the parameters, for specific parameters indicate the values,
'1' it´s true and '0' it´s false
*/
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('notes', {
    content: 1,
    date: 1,
    important: 1,
    _id: 0
  }) // Find all and populate with notes
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  try {
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

    response.status(201).json(savedUser)
  } catch (error) {
    console.error(error)
    response.status(400).json(error)
  }
})

module.exports = usersRouter
