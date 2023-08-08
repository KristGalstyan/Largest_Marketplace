import { Router } from 'express'
import {
  logout,
  signin,
  signup,
  refresh,
  activate,
  forgotPass,
  codeToChangePassword,
  ChangePassword
} from '../controllers/UserController.js'
import signupValidation from '../validation/signup.validation.js'
import signinValidation from '../validation/signin.validation.js'
import { body } from 'express-validator'

const app = new Router()

app.post('/auth/signup', signupValidation, signup)
app.post('/auth/signin', signinValidation, signin)
app.post('/auth/logout', signupValidation, logout)

app.post('/auth/forgotPass', [body('email').isEmail()], forgotPass)
app.patch('/auth/forgotPass/code', codeToChangePassword)
app.patch('/auth/forgotPass/change', ChangePassword)

app.get('/auth/refresh', refresh)
app.get('/activate/:link', activate)

export default app
