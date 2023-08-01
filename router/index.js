import { Router } from 'express'
import { signin, signup } from '../controllers/UserController.js'
import { signupValidation } from '../validation/signup.validation.js'
import { signinValidation } from '../validation/signin.validation.js'

const app = new Router()

app.post('/auth/signup', signupValidation, signup)
app.post('/auth/signin', signinValidation, signin)

export default app
