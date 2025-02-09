import { IPostSchema, PostModel } from "models/Post.model";

export const updatePost = async (
  id: string,
  postData: Partial<IPostSchema>
): Promise<IPostSchema | null> => {
  const updatedPost = await PostModel.findByIdAndUpdate(id, postData, { returnDocument: 'after' }).exec()

  if (!updatedPost) {
    throw new Error('the post is not updaed')
  }

  await updatedPost.populate({
    path: 'comments',
    populate: 'author'
  })

  return updatedPost
}
