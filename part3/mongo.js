// 'npm install mongoose' makes more easy the mongodb configuration wihtout original driver
import mongoose, { Schema, model } from 'mongoose'
import { password } from 'password'

const connectionString = `mongodb+srv://javicu:${password}@cluster0.a003qqx.mongodb.net/notes?retryWrites=true&w=majority`

//  connection to mongodb
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
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
