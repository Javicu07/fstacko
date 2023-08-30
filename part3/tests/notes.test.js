const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../index')

const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const response = await api.get('/api/notes')
  expect(response.body).toHaveLength(2)
})

//  Hook of test, executed after finished all tests
afterAll(() => {
  mongoose.connection.close() //  close the database
  server.close() // close the server
})
