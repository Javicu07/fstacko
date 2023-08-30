//  'npm install supertest -D', library to test http servers and micro services

// 'npm install mongoose' makes more easy the mongodb configuration wihtout original driver
const mongoose = require('mongoose')
//  import { password } from './passwordModule'

const Note = require('./models/Note.js')

//  For testing no use database of production. FATAL ERROR
//  Extract all the variables of .env
const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

//  const connectionString = 'mongodb+srv://javicu:javicu@cluster0.a003qqx.mongodb.net/javdb?'
const connectionString = NODE_ENV === 'test'
  ? MONGO_DB_URI_TEST
  : MONGO_DB_URI

//  connection to mongodb
mongoose.connect(connectionString, {
  //  useNewUrlParser: true,
  //  useUnifiedTopology: true,
  //  useFindAndModify: false,
  //  useCreateIndex: true
})
  .then(() => {
    console.log('Database connected')
  }).catch(err => {
    console.error(err)
  })

// Creating instance of 'Note'
const note = new Note({
  content: 'MongoDB it´s great, use it',
  date: new Date(),
  important: true
})

//  Saving 'note' to the mongo database
note.save()
  .then(result => {
    console.log(result)
    mongoose.connection.close() //  closing the created connection
  })
  .catch(err => {
    console.log(err)
  })

/*
//  Good practice, disconnect if errors occurs
process.on('uncaughtException', () => {
  mongoose.connection.disconnect()
})  */
