import { ROLE } from "constants/roles"
import { IUserSchema } from "models/User.model"

export interface IUserApiData {
  id: string
  login: string
  role: ROLE
}

export interface IMappingUser extends Omit<IUserApiData, 'role'> {
  roleId: ROLE
}

export const mappingUser = (user: IUserSchema | IUserApiData):IMappingUser => ({
  id: user.id,
  login: user.login,
  roleId: user.role
})
