import { validationResult } from 'express-validator'
import { signinService, signupService } from '../services/user.service.js'
import { ApiError } from '../ErrorValidation/ApiError.js'

export async function signup(req, res, next) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest('Validation error', errors.array()))
    }
    const { email, password, userName } = req.body

    const userData = await signupService(userName, email, password)

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000
    })
    res.json(userData)
  } catch (e) {
    console.log(e)
    next(e)
  }
}

export async function signin(req, res, next) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest('Validation error', errors.array()))
    }
    const { email, password } = req.body

    const userData = await signinService(email, password)

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000
    })
    res.json(userData)
  } catch (e) {
    next(e)
  }
}
