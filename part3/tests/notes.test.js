const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../index')
const Note = require('../models/Note')
const { beforeEach } = require('node:test')

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

beforeEach(async () => {
  await Note.deleteMany({})

  const note1 = new Note(initialNotes[0])
  await note1.save()

  const note2 = new Note(initialNotes[1])
  await note2.save()
})

test('notes are returned as json', async () => {
  await api
    .get('api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const response = await api.get('/api/notes')
  expect(response.body).toHaveLength(initialNotes.length)
})

test('the first note is about FullStack', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(note => note.content)

  expect(contents).toContain('Learning FullStack JS')
})

//  Hook of test, executed after finished all tests
afterAll(() => {
  mongoose.connection.close() //  close the database
  server.close() // close the server
})
