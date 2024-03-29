import mongoose from 'mongoose'

const UserModel = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isActivated: {
    type: Boolean,
    default: false
  },
  activationLink: {
    type: String
  },
  userName: {
    type: String
  }
})

export default mongoose.model('User', UserModel)
