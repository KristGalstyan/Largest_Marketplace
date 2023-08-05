import { Router } from 'express'
import {
  logout,
  signin,
  signup,
  refresh
} from '../controllers/UserController.js'
import signupValidation from '../validation/signup.validation.js'
import signinValidation from '../validation/signin.validation.js'

const app = new Router()

app.post('/auth/signup', signupValidation, signup)
app.post('/auth/signin', signinValidation, signin)
app.post('/auth/logout', signupValidation, logout)

app.get('/auth/refresh', refresh)

export default app
