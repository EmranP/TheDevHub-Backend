import { UserModel } from "models/User.model";

export const deleteUser =  (id:string) => UserModel.deleteOne({_id: id})
