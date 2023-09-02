const { Schema, model } = require('mongoose')

//  It´s necessary to make 'Schema' in the code, in this case when we use 'mongodb'
//  because this database is based in 'Documents' (NoSQL)
const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

noteSchema.set('ToJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject._v
  }
})

//  With the 'Schema' created we go to make a model to build instances of the 'Schema'
const Note = model('Note', noteSchema) // 'Note' must be in uppercase because it´s create instances of the model
//  'Note' is singular and the collections in the base it´s in singular

module.exports = Note
