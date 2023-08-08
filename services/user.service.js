import { UserDto } from '../Dto/UserDto.js'
import { ApiError } from '../ErrorValidation/ApiError.js'
import UserModel from '../model/user.model.js'
import bcrypt from 'bcrypt'
import {
  findToken,
  generateTokens,
  saveToken,
  validateRefreshToken
} from './token.service.js'
import MailService from './mail.service.js'
import { v4 } from 'uuid'

const code = v4()

export async function signupService({ userName, password, email }) {
  const candidate = await UserModel.findOne({ email })
  if (candidate) {
    throw ApiError.BadRequest(`this ${email} already exists`)
  }
  const hashPassword = await bcrypt.hash(password, 7)
  const activationLink = v4()

  const user = await UserModel.create({
    userName,
    email,
    password: hashPassword,
    activationLink
  })

  await MailService.sendActivationMail(
    email,
    `${process.env.API_URL}api/activate/${activationLink}`
  )

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

export async function forgotPassService({ email }) {
  const user = await UserModel.findOne({ email })
  if (!user) {
    throw ApiError.UnauthorizedError()
  }
  await MailService.sendCodeToChangePass(email, code)
  return true
}

export async function codeToChangePasswordSevice(codeToChange) {
  if (!codeToChange || codeToChange !== code) {
    throw ApiError.BadRequest('Wrong code')
  }
  return true
}

export async function changedPasswordService(email, password, newPassword) {
  const isExist = await UserModel.findOne({ email })
  if (!isExist) {
    throw ApiError.UnauthorizedError()
  }
  const passwordCompare = await bcrypt.compare(password, isExist.password)

  if (!passwordCompare) {
    throw ApiError.BadRequest('Incorrect password')
  }

  const hashPassword = await bcrypt.hash(newPassword, 7)
  isExist.password = hashPassword
  isExist.save()

  const userDto = new UserDto(isExist)
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
    const tokenFromDB = await findToken(refreshToken)

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

export async function activateService(activationLink) {
  try {
    const user = await UserModel.findOne({ activationLink })
    if (!user) {
      throw ApiError.BadRequest('Incorrect activation link')
    }
    user.isActivated = true
    await user.save()
    return user
  } catch (e) {
    console.log(e)
  }
}
