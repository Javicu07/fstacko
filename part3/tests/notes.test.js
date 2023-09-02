const mongoose = require('mongoose')

const { server } = require('../index')
const Note = require('../models/Note')
const { initialNotes, api } = require('./helpers')
//  const { beforeEach, test } = require('node:test')

beforeEach(async () => {
  await Note.deleteMany({})
  console.log('beforeEach')

  //  Parallel
  /*
  const notesObjects = initialNotes.map(note => new Note(note))
  const promises = notesObjects.map(note => new note.save())
  await Promise.all(promises)
  */

  //  Sequential
  for (const note of initialNotes) {
    const noteObject = new Note(note)
    await noteObject.save()
  }

  // Not predectible
  /*
  const note1 = new Note(initialNotes[0])
  await note1.save()

  const note2 = new Note(initialNotes[1])
  await note2.save()
  */
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

test('a valid note can be added', async () => {
  const newNote = {
    content: 'Next time we going to see "async/await"',
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/notes')

  const contents = response.map(note => note.content)

  expect(response.body).toHaveLength(initialNotes.length + 1)
  expect(contents).toContain(newNote.content)
})

test('a note can be deleted', async () => {
  let response = await api.get('/api/notes')
  const { response: firstResponse } = response.body.map(note => note.content)
  const { body: notes } = firstResponse
  const noteToDelete = notes[0]

  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

  response = await api.get('/api/notes')
  const { contents, response: secondResponse } = response.body.map(note => note.content)

  expect(secondResponse.body).toHaveLength(initialNotes.length - 1)

  expect(contents).not.toContain(noteToDelete.content)
})

test('a note that not exist can not be deleted', async () => {
  await api
    .delete('/api/notes/1234')
    .expect(400)

  const response = await api.get('/api/notes')
  const contents = response.body.map(note => note.content)

  expect(contents.body).toHaveLength(initialNotes.length)
})

//  Hook of test, executed after finished all tests
afterAll(() => {
  mongoose.connection.close() //  close the database
  server.close() // close the server
})
