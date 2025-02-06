import mongoose, {Document, Schema} from 'mongoose'
import { IUserSchema } from './User.model'

export interface ICommentSchema extends Document {
  _id: string
  content:  string
  author:   typeof Schema.Types.ObjectId | Pick<IUserSchema, 'login'>
  createdAt: Date
}

const CommentSchema: Schema<ICommentSchema> = new Schema(
  {
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)

export const CommentModel = mongoose.model<ICommentSchema>('Comment', CommentSchema)

