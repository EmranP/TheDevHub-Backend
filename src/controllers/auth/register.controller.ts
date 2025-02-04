import bcrypt from 'bcrypt'
import { IUserSchema, UserModel } from 'models/User.model'
import { IUserApiData } from 'utils/mapping.util'


export const register =  async (login:string, pass:string):Promise<IUserApiData> => {
  if (!pass) {
    throw new Error("Passwod is enity!")
  }

  const passwordHash = await bcrypt.hash(pass, 10)

  const user: IUserSchema = await UserModel.create({login, pass: passwordHash})

  return {
    id: user._id.toString(),
    login: user.login,
    role: user.role || 2
  }
}
