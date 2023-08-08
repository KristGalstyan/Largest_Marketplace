import { body } from 'express-validator'

const signupValidation = [
  body('userName').isString().isLength({ min: 3, max: 16 }),
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 16 })
]

export default signupValidation
