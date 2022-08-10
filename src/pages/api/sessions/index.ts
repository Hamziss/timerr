/* eslint-disable no-nested-ternary */
import jwt from "jsonwebtoken"
import type { NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession as getSession } from "next-auth/next"
import Users from "../../../../models/user"
import connectDB from "../../../../utils/connectDB"
import { authOptions } from "../auth/[...nextauth]"

connectDB()
interface IPayloadJWT {
	hasAccess: boolean
}
export default async function sessionHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req

	const session = await getSession(req, res, authOptions)

	const token = req.headers.authorization
	const { time, name, image } = req.body

	switch (method) {
		case "PUT":
			// @desc add session to user
			// @route GET /api/session
			// @access Private
			if (!session)
				return res.status(401).json({ error: "You must be logged in." })

			try {
				const verfiedtoken: any = jwt.verify(
					token!,
					process.env.NEXT_PUBLIC_SECRET_SESSION!
				) as IPayloadJWT
				if (!verfiedtoken.hasAccess)
					return res.status(401).json({ error: "not allowed to add session" })

				const { email } = session.user!
				// TODO: change time > 9
				const user = await Users.findOneAndUpdate(
					{ email },
					{
						$inc: { sessions: 1, coins: time * 50, time },
						$push: {
							trees: [
								{
									size: 1,
									name,
									createdAt: new Date(),
									image,
								},
							],
						},
					},
					{ new: true }
				)

				if (!user) return res.status(404).json({ msg: "User not found" })
				return res.status(200).json({ user })
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

		default:
			break
	}
	return null
}
