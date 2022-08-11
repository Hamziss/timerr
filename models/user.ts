import mongoose, { Model, Schema } from "mongoose"
import { IUser } from "../src/types/user"

const userSchema: Schema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		time: {
			type: Number,
			default: 0,
		},
		bio: {
			type: String,
			default: "",
		},

		password: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		isAdmin: { type: Boolean, default: false },
		sessions: { type: Number, default: 0 },
		trees: [{ size: Number, name: String, createdAt: Date, image: String }],
		animals: [{ type: mongoose.Types.ObjectId, ref: "animal" }],
		coins: { type: Number, default: 0 },
		rank: { type: String, default: "bronze" },
		image: {
			type: String,
			default:
				"https://res.cloudinary.com/dyzwu7mr1/image/upload/v1659616453/default_alfetk.png",
		},
	},
	{ timestamps: true }
)

const User: Model<IUser> =
	mongoose.models.User || mongoose.model("User", userSchema)
export default User
