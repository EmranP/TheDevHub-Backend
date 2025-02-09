import mongoose, {Document, Schema} from 'mongoose'
import validator from 'validator'
import { ICommentSchema } from './Comment.model'

export interface IPostSchema extends Document {
	title: string
	image: mongoose.SchemaDefinitionProperty<[string, boolean]>
	content: string
	comments: (mongoose.Types.ObjectId | ICommentSchema)[]
	createdAt: Date,
	updatedAt: Date
}

const PostSchema = new Schema<IPostSchema>({
	title: {
		type: String,
		required: [true, 'Title is required'],
		trim: true,
		index: true,
	},
	image: {
		type: String,
		required: [true, 'Image URL is required'],
		validate: {
			validator: validator.isURL,
			message: 'Image should be a valid url'
		},
	},
	content: {
		type: String,
		required: true,
		trim: true
	},
	comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    }],
}, {timestamps: true})

export const PostModel = mongoose.model<IPostSchema>('Post', PostSchema)
