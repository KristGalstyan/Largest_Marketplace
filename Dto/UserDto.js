class UserDto {
  id
  name
  email
  constructor(model) {
    this.id = model._id
    this.email = model.email
    this.name = model.userName
  }
}
export { UserDto }
