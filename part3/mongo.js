// 'npm install mongoose' makes more easy the mongodb configuration wihtout original driver
import mongoose, { Schema, model } from 'mongoose'
//  import { password } from 'passwordModule'

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

//  It´s necessary to make 'Schema' in the code, in this case when we use 'mongodb'
//  because this database is based in 'Documents' (NoSQL)
const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean
})

//  With the 'Schema' created we go to make a model to build instances of the 'Schema'
const Note = model('Note', noteSchema) // 'Note' must be in uppercase because it´s create instances of the model
//  'Note' is singular and the collections in the base it´s in singular

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
