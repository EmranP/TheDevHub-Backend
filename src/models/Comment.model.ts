import { ROLE } from 'constants/roles'
import mongoose, {Document, mongo, Schema
} from 'mongoose'

export interface ICommentSchema extends Document {
  content:  string
  author:   typeof Schema.Types.ObjectId
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

