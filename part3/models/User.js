const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: String,
  name: String,
  passwordHash: String, // actually the password it´s needs to be codified
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note' //  Reference to the 'Note' model created
  }]
})

userSchema.set('ToJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject._v

    //  It´s essencial don´t return the user´s password
    delete returnedObject.passwordHash
  }
})

//  Creating instances of User
const User = model('User', userSchema)

module.exports = User
