import { IPostSchema, PostModel } from "models/Post.model";

export interface IPostAddProps {
  title: string
  content: string
  image: string
}

export const addPost = async (post:IPostAddProps):Promise<IPostSchema> => {
  const newPost = await PostModel.create(post)

  if (!newPost) {
    throw new Error('Post is not created!!');
  }

  return newPost
}
