import { body } from 'express-validator'

const signupValidation = [
  body('userName').isString().isLength({ min: 3, max: 12 }),
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 12 })
]

export default signupValidation
