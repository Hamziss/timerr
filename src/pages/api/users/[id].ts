import type { NextApiRequest, NextApiResponse } from "next"
import Users from "../../../../models/user"
import connectDB from "../../../utils/connectDB"

export default async function userHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { query, method } = req
	const { id } = query
	await connectDB()
	switch (method) {
		case "GET":
			// @desc get user by id
			// @route GET /api/users/:id
			// @access Public
			// TODO: add sorting by session
			try {
				const user = await Users.findById(id).select("-password -isAdmin")

				if (user)
					return res.status(200).json({ user: { id: user._id, ...user._doc } })

				return res.status(404).json({ msg: "User not found" })
			} catch (error) {
				if (error instanceof Error) {
					return res.status(400).json({
						error: error.message,
						message: "error in get user by id controller",
					})
				}
				return res.status(400).json({
					error,
				})
			}
		case "PUT":
			break
		default:
			break
	}
	return null
}
