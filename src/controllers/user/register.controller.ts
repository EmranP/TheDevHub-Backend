import bcrypt from 'bcrypt'
import { IUserSchema, UserModel } from 'models/User.model'
import { IUserApiData } from 'utils/mapping.util'
import { Token } from 'utils/token.util'

interface IAuthRegister {
  user: IUserApiData,
  token: string
}

export const registerUser =  async (login:string, pass:string):Promise<IAuthRegister> => {
  if (!pass) {
    throw new Error("Passwod is enity!")
  }

  const passwordHash = await bcrypt.hash(pass, 10)

  const userData: IUserSchema = await UserModel.create({login, pass: passwordHash})
  const token = new Token().generateToken({id: String(userData._id)})

  const user = {
    id: userData._id.toString(),
    login: userData.login,
    role: userData.role || 2
  }

  return { user, token }
}
