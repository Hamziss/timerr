import type { NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession as getSession } from "next-auth/next"
import Users from "../../../../models/user"
import { IAnimal } from "../../../types/animal"
import connectDB from "../../../utils/connectDB"

import { authOptions } from "../auth/[...nextauth]"

connectDB()
interface IBody {
	animal: IAnimal
}
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession(req, res, authOptions)
	await connectDB()
	const { method } = req
	const { animal } = req.body as IBody

	if (!session) return res.status(401).json({ error: "You have to login" })
	const { email } = session.user
	switch (method) {
		case "POST":
			// @desc buy animal
			// @route POST /api/users/store
			// @access Public

			try {
				const user = await Users.findOne({ email })
				// no need to check if user exists because he is loged in
				if (user) {
					if (user.coins > animal.price) {
						user.animals.push(req.body.animal)
						user.coins -= animal.price
						user.animals.sort((a: any, b: any) => b.price - a.price)
						await user.save()
						return res.status(200).json({
							user: { id: user._id, ...user._doc },
							message: "Animal bought",
						})
					}
					return res
						.status(400)
						.json({ message: "You don't have enough money" })
				}
			} catch (error) {
				if (error instanceof Error) {
					res.status(400).json({
						error: error.message,
						message: "error in get all users controller",
					})
				} else {
					res.status(400).json({
						error,
					})
				}
			}
			break
		case "PUT":
			break
		case "DELETE":
			// @desc sell animal
			// @route DELETE /api/users/store
			// @access Public

			try {
				const user = await Users.findOne({ email })
				if (user) {
					const { animals } = user
					animals.splice(animals.indexOf(animal), 1)
				}
			} catch (error) {
				if (error instanceof Error) {
					res.status(400).json({
						error: error.message,
						message: "error in get all users controller",
					})
				} else {
					res.status(400).json({
						error,
					})
				}
			}
			break
		default:
			break
	}
	return null
}
