//  const http = require('http') //Common JS
//  input http from 'http'    //ECMA_Script Modules
//  linters used "Eslint" & "Standard" (use Eslint)

import dotenv from 'dotenv'
import './mongo.js' //  Import directly by 'mongo' to execute the code (Connect First)
//  'express' simplify the code 'npm install express'
import express from 'express'
import cors from 'cors'
import logger from './loggerMiddleWare.js'
import Note from './models/Note.js'
import { handleErrors } from './middleware/handleErrors.js'
import { notFound } from './middleware/notFound.js'

dotenv.config() //  Read the file '.env'
const app = express()

app.use(cors()) // Avaliable request from any route

//  "middleware" it´s a function that intercepts the request from the API
app.use(express.json()) //  enable to use json.parse avaliable on 'express'

app.use(logger)

const notes = []

/*
let notes = [
  {
    id: 1,
    content: 'I have to subscribe it',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'I have to study fullstack bootcamp´s class',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'Review the JS challenges',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]
*/

// install nodemon auto-update the application for changes 'npm install nodemon -D'
// install the package not global, dependencies in the same project
// A createServer se le pasa un 'callback'
// const app = http.createServer((request, response) => {
//    response.writeHead(200, {'Content-Type': 'application/json'})
//    response.end(JSON.stringify(notes))
// })

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response, next) => {
  const { id } = request.params

  Note.findById(id).then(note => {
    if (note) {
      return response.json(notes)
    } else {
      response.status(404).end()
    }
  }).catch(err => next(err))

  /*  const id = Number(request.params.id)  //  Whitout using mongodb
  console.log({ id })
  const note = notes.find(note => note.id === id)
  console.log({ note })
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  } */
})

//  Tools to make 'delete' --> postman, insomnia, REST Client (extensión)
app.delete('/api/notes/:id', (request, response, next) => {
  const { id } = request.params

  Note.findByIdAndDelete(id)
    .then(() => response.status(204).end())
    .catch(error => next(error))

  /*  const id = Number(request.params.id)  //  Whitout using mondb
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()  */
})

// Add a resource with 'post'
app.post('/api/notes', (request, response) => {
  //  Using mongodb
  const note = request.body

  if (!note.content) {
    return response.status(404).json({
      error: 'required "content" field is missing'
    })
  }

  const newNote = new Note({
    content: note.content,
    date: new Date(),
    important: note.important || false
  })

  newNote.save().then(savedNote => {
    response.json(savedNote)
  })

  /*  const note = request.body //  Whitout using mongodb
  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note.content is missing'
    })
  }

  console.log(note)

  const ids = notes.map(note => note.id)
  const idMax = Math.max(...ids)

  const newNote = {
    id: idMax + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }

  notes = [...notes, newNote] // notes = notes.concat(newNote)

  response.status(201).json(newNote)  */
})

app.put('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  const note = request.body

  const newNoteInfo = {
    content: note.content,
    important: note.important
  }

  //  Find and update a especific note. {new:true} indicate response the updated note
  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then(result => {
      response.json(result)
    })
})

//  app.use come here after the error in the 'next' thanks to 'Middleware'
//  the order of 'middlewares' it´s important. Reading UP to DOWN in the code
/*  app.use((request, response, next) => {
  response.status(404).end()
})

app.use((error, request, response, next) => {
  console.error(error)

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'id used is malformed' })
  } else {
    response.status(500).end()
  }
})  */

//  The same but with good practice. Import from 'middleware.js' to handle errors
app.use(notFound)
app.use(handleErrors)

// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
