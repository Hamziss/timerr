// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession as getSession } from "next-auth/next"
import Animal from "../../../../models/animal"
import connectDB from "../../../../utils/connectDB"
import { authOptions } from "../auth/[...nextauth]"

connectDB()

export default async function animalshandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req
	const { name, category, price, feeling, ownedSince, rarety, image } = req.body
	const session = await getSession(req, res, authOptions)
	console.log(session)

	switch (method) {
		case "GET":
			// @desc get all animals
			// @route GET /api/animals
			// @access Public

			try {
				const animals = await Animal.find()
				res.status(200).json({ animals })
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
			// @desc create new animal
			// @route POST /api/animals
			// @access Private
			if (!session?.user.isAdmin) {
				return res.status(401).json({ error: "You are not authorized" })
			}
			try {
				const newAnimal = new Animal({
					name,
					category,
					price,
					feeling,
					ownedSince,
					rarety,
					image,
				})
				await newAnimal.save()
				res.status(200).json({ message: "Animal added successfully!" })
			} catch (e: any) {
				return res.status(500).json({ error: e.message })
			}
			break
		case "DELETE":
			// @desc delete an animal from store
			// @route DELETE /api/animals
			// @access Private
			if (!session?.user.isAdmin) {
				return res.status(401).json({ error: "You are not authorized" })
			}
			try {
				const response = Animal.deleteOne({ name })
				return res
					.status(200)
					.json({ message: "deleleted animal with success", response })
			} catch (e: any) {
				return res.status(500).json({ error: e.message })
			}

		default:
			break
	}
	return null
}
