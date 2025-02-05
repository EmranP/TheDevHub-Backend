import { IUserSchema, UserModel } from "models/User.model";


export const updateUser = async (id:string, userData: Partial<IUserSchema>):Promise<IUserSchema | null> =>
  UserModel.findByIdAndUpdate(id, userData, {returnDocument: 'after'}).exec()
