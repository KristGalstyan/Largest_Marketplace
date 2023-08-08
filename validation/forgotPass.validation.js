import { body } from 'express-validator'

const forgotPassValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 16 }),
  body('newPassword').isLength({ min: 3, max: 16 })
]

export default forgotPassValidation
