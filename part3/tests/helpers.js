const { app } = require('../index')
const supertest = require('supertest')

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

module.exports = {
  initialNotes,
  api
}
