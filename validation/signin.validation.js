import { body } from 'express-validator'

const signinValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 16 })
]

export default signinValidation
