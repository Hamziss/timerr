import mongoose, { Model, Schema } from "mongoose"
import { IAnimal } from "../src/types/animal"

const animalSchema: Schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		category: {
			type: String,
		},
		price: { type: Number, required: true },
		feeling: { type: String },
		rarety: { type: String },
		image: { type: String },
	},
	{ timestamps: true }
)

const animal: Model<IAnimal> =
	mongoose.models.animal || mongoose.model("animal", animalSchema)
export default animal
