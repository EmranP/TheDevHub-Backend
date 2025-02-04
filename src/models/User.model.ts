import { ROLE } from 'constants/roles'
import mongoose, {Document, Schema
} from 'mongoose'

export interface IUserSchema extends Document {
	login: string
	password: string
	role: number
}

const UserSchema: Schema<IUserSchema> = new Schema(
	{
		login: {
			type: String,
			required: [true, 'Login is required'],
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
		},
		role: {
			type: Number,
			default: ROLE.USER,
		},
	},
	{ timestamps: true }
)

export const UserModel = mongoose.model<IUserSchema>('User', UserSchema)
