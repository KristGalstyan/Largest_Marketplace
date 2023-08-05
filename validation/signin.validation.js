import { body } from 'express-validator'

const signinValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 12 })
]

export default signinValidation
