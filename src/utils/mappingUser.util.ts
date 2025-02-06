import { ROLE } from "constants/roles"
import { IUserSchema } from "models/User.model"

export interface IUserDTO extends Omit<IUserSchema, 'role'> {
  roleId: ROLE
}


export const mappingUser = (user: Partial<IUserSchema>): Partial<IUserDTO> => ({
  id: user.id,
  login: user.login,
  roleId: user.role
})
