import mongoose, {Document, Schema} from 'mongoose'
import validator from 'validator'

export interface IPostSchema extends Document {
	title: string
	imageUrl: string
	content: string
	author: mongoose.Types.ObjectId
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
	imageUrl: {
		type: String,
		required: [true, 'Image URL is required'],
		validate: [validator.isURL, 'Image should be a valid URL']
	},
	content: {
		type: String,
		required: true,
		trim: true
	},
	author: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    }],
}, {timestamps: true})

export const PostModel = mongoose.model<IPostSchema>('Post', PostSchema)
