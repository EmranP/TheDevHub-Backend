import { CommentModel } from "models/Comment.model"
import { PostModel } from "models/Post.model"

export const removeComment = async (postId:string, commentId: string | number):Promise<void> => {
  if (!postId || !commentId) {
    throw new Error('Remove comment is not found')
  }

  const commentRemove = await CommentModel.deleteOne({ _id: commentId })

  await PostModel.findByIdAndUpdate(postId, {$pull: {comments: commentId}})

  if (!commentRemove) {
    throw new Error('Remove handler comment is not running!!')
  }

  return
}
