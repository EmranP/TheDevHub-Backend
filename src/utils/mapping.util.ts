export interface IUserApiData {
  id: string
  login: string
  role: number
}

export interface IMappingUser extends Omit<IUserApiData, 'role'> {
  roleId: number
}

export const mappingUser = (user:IUserApiData):IMappingUser => ({
  id: user.id,
  login: user.login,
  roleId: user.role
})
