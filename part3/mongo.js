// 'npm install mongoose' makes more easy the mongodb configuration wihtout original driver
import mongoose from 'mongoose'
//  import { password } from './passwordModule'

import Note from './models/Note'

const connectionString = 'mongodb+srv://javicu:javicu@cluster0.a003qqx.mongodb.net/javdb?'

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
