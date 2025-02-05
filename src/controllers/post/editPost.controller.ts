import { IPostSchema, PostModel } from "models/Post.model";

export const updatePost = async (
  id: string,
  postData: Partial<IPostSchema>
): Promise<IPostSchema | null> => {
  const post = await PostModel.findById(id)

  if (!post) {
    throw new Error('Post not found')
  }

  return PostModel.findByIdAndUpdate(id, postData, { returnDocument: 'after' }).exec()
}
