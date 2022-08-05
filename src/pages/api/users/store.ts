import type { NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession as getSession } from "next-auth/next"
import Users from "../../../../models/user"
import connectDB from "../../../../utils/connectDB"
import { IAnimal } from "../../../types/animal"

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
	const email = session?.user.email
	const { method } = req
	const { animal } = req.body as IBody

	if (!session) return res.status(401).json({ error: "You have to login" })
	switch (method) {
		case "PUT":
			// @desc buy animal
			// @route PUT /api/users/store
			// @access Public

			try {
				const user = await Users.findOne({ email })
				// no need to check if user exists because he is loged in
				if (user) {
					if (user.coins > animal.price) {
						user.animals.push(req.body.animal)
						await user.save()
						return res.status(200).json({ user, msg: "Animal bought" })
					}
					return res
						.status(401)
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
		case "POST":
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
