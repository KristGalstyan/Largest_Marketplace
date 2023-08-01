export async function signup(req, res, next) {
  try {
    const { userName, email, password } = req.body
    const user = await signupService(userName, email, password)
  } catch (e) {
    next(e)
  }
}
