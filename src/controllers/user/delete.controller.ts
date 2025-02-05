import { UserModel } from "models/User.model";

export const deleteUser =  (id:string) => UserModel.findOne({_id: id})
