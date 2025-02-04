// import { ROLE } from 'constants/roles'
import mongoose, {Document, Schema} from 'mongoose'
import validator from 'validator'

export interface IPostSchema extends Document {
	title: string
	image: string
	content: string
	author: typeof Schema.Types.ObjectId
}

const PostSchema: Schema<IPostSchema> = new Schema({
	title: {
		type: String,
		required: [true, 'Title is required'],
		trim: true,
	},
	image: {
		type: String,
		required: [true, 'Image URL is required'],
		validate: {
			validator: (str:string) => validator.isURL(str),
			message: 'Image should be valid url',
		},
	},
	content: {
		type: String,
		required: true,
		trim: true
	},
	author: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }],
}, {timestamps: true})

export const PostModel = mongoose.model<IPostSchema>('Post', PostSchema)
