import bcrypt from 'bcrypt'
import { IUserSchema, UserModel } from 'models/User.model'
import { Token } from 'utils/token.util'

interface IAuthRegister {
  user: Partial<IUserSchema>,
  token: string
}

export const registerUser =  async (login:string, password:string):Promise<IAuthRegister> => {
  if (!password) {
    throw new Error('Login and Pass should be enity!')
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const userData: IUserSchema = await UserModel.create({ login, password: passwordHash })
  const token = new Token().generateToken({id: String(userData._id)})


  const user = {
    id: userData.id.toString(),
    login: userData.login,
    role: userData.role || 2
  }

  return { user, token }
}
