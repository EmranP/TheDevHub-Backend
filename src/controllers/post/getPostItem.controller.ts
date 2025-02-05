import { IPostSchema, PostModel } from "models/Post.model";

export const getPostItem = (id: string):Promise<IPostSchema | null> => PostModel.findById(id)
