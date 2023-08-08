import { validationResult } from 'express-validator'
import { ApiError } from '../ErrorValidation/ApiError.js'
import {
  activateService,
  codeToChangePasswordSevice,
  forgotPassService,
  refreshService,
  signinService,
  signupService
} from '../services/user.service.js'
import { removeToken } from '../services/token.service.js'

export async function signup(req, res, next) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest('Validation error', errors.array()))
    }
    const { userName, email, password } = req.body
    const userData = await signupService({ userName, email, password })

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000
    })
    res.json(userData)
  } catch (e) {
    console.log(e)
    next(e)
  }
}
export async function codeToChangePassword(req, res, next) {
  try {
    const codeToChange = req.body.code
    const data = await codeToChangePasswordSevice(codeToChange)
    res.status(200).json({
      condition: data
    })
  } catch (e) {
    next(e)
  }
}

export async function ChangePassword(req, res, next) {
  try {
    const codeToChange = req.body.code
    const data = await codeToChangePasswordSevice(codeToChange)
    res.status(200).json({
      condition: data
    })
  } catch (e) {
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
    const userData = await signinService({ email, password })

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000
    })
    res.json(userData)
  } catch (e) {
    console.log(e)
    next(e)
  }
}

export async function forgotPass(req, res, next) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest('Validation error', errors.array()))
    }
    const { email } = req.body
    const data = await forgotPassService({ email })
    res.status(200).json({
      condition: data
    })
  } catch (e) {
    next(e)
  }
}

export async function logout(req, res, next) {
  try {
    const { refreshToken } = req.cookies
    const token = await removeToken(refreshToken)
    res.clearCookie('refreshToken')
    res.status(200).json(token)
  } catch (e) {
    console.log(e)
    next(e)
  }
}

export async function activate(req, res, next) {
  try {
    const activationLink = req.params.link
    const userData = await activateService(activationLink)
    res.json(userData)
  } catch (e) {
    console.log(e)
    next(e)
  }
}

export async function refresh(req, res, next) {
  try {
    const { refreshToken } = req.cookies
    const userData = await refreshService(refreshToken)
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000
    })
    return res.json(userData)
  } catch (e) {
    console.log(e)
    next(e)
  }
}
