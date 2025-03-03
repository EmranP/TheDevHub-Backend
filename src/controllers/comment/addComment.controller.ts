import { CommentModel, ICommentSchema } from "models/Comment.model"
import { PostModel } from "models/Post.model"

interface IAddCommentRequest {
  content: string
  author: string | number
}

export const addComment = async (postId:string, comment:IAddCommentRequest):Promise<ICommentSchema> => {
  const  newComment = await CommentModel.create(comment)

  await PostModel.findByIdAndUpdate(postId, {$push: {comments: newComment}})

  await newComment.populate('author')

  return newComment
}
