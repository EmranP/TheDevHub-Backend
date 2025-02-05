import { IUserSchema, UserModel } from "models/User.model"
import bcrypt from 'bcrypt'
import { Token } from "utils/token.util"
import { Document } from "mongoose"

export interface ILogin {
  token:string
  user: Omit<IUserSchema & Document, "password">
}


export const loginUser = async (login:string, pass:string):Promise<ILogin> => {
  const user = await UserModel.findOne({ login }).lean()

  if (!user) {
    throw new Error('User not found')
  }

  const isPasswordMatch = await bcrypt.compare(pass, user.password)

  if (!isPasswordMatch) {
    throw new Error('Wrong is password')
  }

  const token = new Token().generateToken({id: String(user._id)})

  const {password, ...userWithPassword} = user

  return { token, user: userWithPassword as ILogin['user'] }
}
