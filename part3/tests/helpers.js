const { app } = require('../index')
const supertest = require('supertest')
const User = require('../models/User')

const api = supertest(app)

const initialNotes = [
  {
    content: 'Learning FullStack JS',
    important: true,
    date: new Date()
  },
  {
    content: 'Continue learning',
    important: true,
    date: new Date()
  }
]

const getUsers = async () => {
  const usersDB = await User.find({})
  return usersDB.map(user => user.toJSON())
}

module.exports = {
  initialNotes,
  api,
  getUsers
}
