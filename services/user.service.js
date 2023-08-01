import UserModel from '../model/user.model.js'

export async function signupService(userName, email, password) {
  const candidate = await UserModel.findOne({ email })
}
