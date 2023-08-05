import { UserDto } from '../Dto/UserDto.js'
import { ApiError } from '../ErrorValidation/ApiError.js'
import UserModel from '../model/user.model.js'
import bcrypt from 'bcrypt'
import {
  generateTokens,
  saveToken,
  validateRefreshToken
} from './token.service.js'
import TokenModel from '../model/token.model.js'

export async function signupService({ userName, password, email }) {
  const candidate = await UserModel.findOne({ email })
  if (candidate) {
    throw ApiError.BadRequest(`this ${email} already exists`)
  }
  const hashPassword = await bcrypt.hash(password, 7)

  const user = await UserModel.create({
    userName,
    email,
    password: hashPassword
  })

  const userDto = new UserDto(user)
  const tokens = generateTokens({ ...userDto })
  await saveToken(userDto.id, tokens.refreshToken)
  return {
    ...tokens,
    user: userDto
  }
}

export async function signinService({ password, email }) {
  const user = await UserModel.findOne({ email })
  if (!user) {
    throw ApiError.BadRequest(`Incorrect login or password`)
  }
  const passCompare = await bcrypt.compare(password, user.password)

  if (!passCompare) {
    throw ApiError.BadRequest(`Incorrect login or password`)
  }

  const userDto = new UserDto(user)
  const tokens = generateTokens({ ...userDto })
  await saveToken(userDto.id, tokens.refreshToken)
  return {
    ...tokens,
    user: userDto
  }
}

export async function refreshService(refreshToken) {
  try {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
    const tokenFromDB = await TokenModel.findOne({ refreshToken })
    const userData = await validateRefreshToken(refreshToken)

    if (!tokenFromDB || !userData) {
      throw ApiError.UnauthorizedError()
    }

    const user = await UserModel.findById(userData.id)
    const userDto = new UserDto(user)
    const tokens = generateTokens({ ...userDto })
    await saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  } catch (e) {
    console.log(e)
  }
}
