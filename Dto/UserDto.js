class UserDto {
  email
  name
  id
  constructor(model) {
    this.email = model.email
    this.name = model.userName
    this.id = model._id
  }
}

export { UserDto }
