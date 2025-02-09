import { ICommentSchema } from "models/Comment.model"
import { IUserSchema } from "models/User.model"

export interface ICommentDTO {
  id: number | string
  content: string
  author: Pick<IUserSchema, 'login'>
  publishedAt: Date
}

export const mapComment = (comment: ICommentSchema):ICommentDTO => (
  {
    content: comment.content,
    author: comment.author.login,
    id: comment._id,
    publishedAt: comment.createdAt
  }
)
