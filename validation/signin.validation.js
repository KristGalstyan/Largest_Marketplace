import { body } from 'express-validator'

export const signinValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 4, max: 12 })
]
