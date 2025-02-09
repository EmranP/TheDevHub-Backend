import { IUserSchema, UserModel } from "models/User.model"
import bcrypt from 'bcrypt'
import { Document } from "mongoose"
import { generate } from "utils/token.util"

export interface ILogin {
  token:string
  user: Omit<IUserSchema & Document, "password">
}


export const loginUser = async (login :string, password :string):Promise<ILogin> => {
  const user = await UserModel.findOne({ login })

  if (!user) {
    throw new Error('User not found ((')
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password)

  if (!isPasswordMatch) {
    throw new Error('Wrong password')
  }

  const token = generate({id: user._id as string})


  return { token, user }
}
