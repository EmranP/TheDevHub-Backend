import { ROLE } from "constants/roles"
import { IUserSchema, UserModel } from "models/User.model"

export const getUsers = async ():Promise<IUserSchema[] | null> => {
  const users = await UserModel.find()

  return users.length ? users : null
}

export const getRoles = () => (
  [
    { id: ROLE.ADMIN, name: 'Admin'},
    { id: ROLE.MODERATOR, name: 'Moderator'},
    { id: ROLE.USER, name: 'User'},
  ]
)
