import { body } from 'express-validator'

export const signupValidation = [
  body('userName').isString().isLength({ min: 2, max: 10 }),
  body('password').isLength({ min: 4, max: 17 }),
  body('email').isEmail()
]
