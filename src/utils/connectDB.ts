/* eslint-disable no-console */
import mongoose, { ConnectOptions } from "mongoose"

const connectDB = () => {
	if (mongoose.connections[0].readyState) {
		console.log("Already connected.")
		return
	}
	mongoose.connect(
		`${process.env.MONGODB_URI}`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		} as ConnectOptions,
		err => {
			if (err) throw err
			console.log("Connected to mongodb.")
		}
	)
}

export default connectDB
