import { IPostSchema, PostModel } from "models/Post.model";

export const updatePost = async (
  id: string,
  postData: Partial<IPostSchema>
): Promise<IPostSchema | null> => {
  const post = await PostModel.findById(id)

  if (!post) {
    throw new Error('Post not found')
  }

  // Maybe post parmas should be change id
  const updatedPost = await PostModel.findByIdAndUpdate(post, postData, { returnDocument: 'after' }).exec()

  if (!updatedPost) {
    throw new Error('the post is not updaed')
  }

  await updatedPost.populate({
    path: 'comments',
    populate: 'author'
  })

  return updatedPost
}
