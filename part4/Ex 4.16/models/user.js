const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // esto asegura la unicidad de username
    minlength: 3
  },
  name: String,
  passwordHash: {
    type: String,
    required: true,
    minlength: 3
  }
})

userSchema.set('toJSON', {
  transform: (document, returnesObject) => {
    returnesObject.id = returnesObject._id.toString()
    delete returnesObject._id
    delete returnesObject.__v
    delete returnesObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User