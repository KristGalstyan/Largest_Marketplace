class UserDto {
  id
  name
  email
  isActivated
  constructor(model) {
    this.id = model._id
    this.email = model.email
    this.name = model.userName
    this.isActivated = model.isActivated
  }
}
export { UserDto }
