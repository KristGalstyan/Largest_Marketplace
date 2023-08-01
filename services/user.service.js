import { UserDto } from '../Dto/UserDto.js'
import UserModel from '../model/user.model.js'
import bcrypt from 'bcrypt'
import { generateTokens, saveToken } from './token.service.js'
import { ApiError } from '../ErrorValidation/ApiError.js'

export async function signupService(userName, email, password) {
  const candidate = await UserModel.findOne({ email })
  if (candidate) {
    throw ApiError.BadRequest(`User with ${email} email address already exists`)
  }
  const hashPassword = await bcrypt.hash(password, 6)

  const user = await UserModel.create({
    email,
    userName,
    password: hashPassword
  })
  const userDto = new UserDto(user)
  const tokens = generateTokens({ ...UserDto })
  await saveToken(userDto.id, tokens.refreshToken)
  return {
    ...tokens,
    user: userDto
  }
}
