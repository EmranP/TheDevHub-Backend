import bcrypt from 'bcrypt'
import { IUserSchema, UserModel } from 'models/User.model'
import { generate } from 'utils/token.util'

interface IAuthRegister {
  user: Partial<IUserSchema>,
  token: string
}

export const registerUser =  async (login:string, password:string):Promise<IAuthRegister> => {
  if (!password) {
    throw new Error('Login and Pass should be enity!')
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = await UserModel.create({ login, password: passwordHash })

  const token = generate({id: String(user._id)})


  return { user, token }
}
