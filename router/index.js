import { Router } from 'express'
import { signup } from '../controllers/UserController.js'
import { signupValidation } from '../validation/signup.validation.js'

const app = new Router()

app.post('/auth/signup', signupValidation, signup)

export default app
