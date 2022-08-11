/* eslint-disable no-case-declarations */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import bcrypt from "bcrypt"
import type { NextApiRequest, NextApiResponse } from "next"
import { Session } from "next-auth"
import { unstable_getServerSession as getSession } from "next-auth/next"
import Users from "../../../../models/user"
import connectDB from "../../../../utils/connectDB"
import { authOptions } from "../auth/[...nextauth]"

export default async function handlerUsers(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req
	const { firstName, lastName, email, password, image, username, bio } =
		req.body
	connectDB()
	switch (method) {
		case "GET":
			// @desc get all users
			// @route GET /api/users
			// @access Public
			try {
				const users = await Users.find()
					.select("-password -isAdmin")
					.sort({ time: -1 })

				return res.status(200).json({ users })
			} catch (error) {
				if (error instanceof Error) {
					return res.status(400).json({
						error: error.message,
						message: "error in get all users controller",
					})
				}
				return res.status(400).json({
					error,
				})
			}
		case "POST":
			// @desc create new user
			// @route POST /api/users
			// @access Public
			try {
				const user = await Users.findOne({ email })

				if (user)
					return res.status(400).json({ error: "This user already exists." })

				const passwordHash = await bcrypt.hash(password, 12)

				const newUser = new Users({
					firstName,
					email,
					username,
					password: passwordHash,
					lastName,
				})
				await newUser.save()
				return res.json({ msg: "Register Success!" })
			} catch (e: any) {
				return res.status(500).json({ err: e.message })
			}
		case "PUT":
			// @desc update user
			// @route PUT /api/users
			// @access Private
			const session = (await getSession(req, res, authOptions)) as Session
			if (!session)
				return res.status(401).json({ error: "You must be logged in." })
			const { email: emailUser } = session.user
			// TODO: add update password
			try {
				const user = await Users.findOneAndUpdate(
					{ email: emailUser },
					{
						firstName,
						lastName,
						image,
						username,
						bio,
					},
					{ new: true }
				)
				if (!user) return res.status(404).json({ error: "User not found." })
				// if (password) {
				// 	const passwordHash = await bcrypt.hash(password, 12)
				// 	await user.update({
				// 		password: passwordHash,
				// 		firstName,
				// 		lastName,
				// 		username,
				// 		image,
				// 	})
				// } else {
				// 	await user.update({
				// 		firstName,
				// 		lastName,
				// 		username,
				// 		image,
				// 		bio,
				// 	})
				// }
				return res.status(200).json({ user })
			} catch (error) {
				if (error instanceof Error) {
					return res.status(400).json({
						error: error.message,
						message: "error in update user controller",
					})
				}
				return res.status(400).json({
					error,
				})
			}
		case "DELETE":
			// @desc delete user
			// @route DELETE /api/users
			// @access Private

			try {
				const user = await Users.findOne({ emailUser })
				if (!user) return res.status(404).json({ error: "User not found." })
				await user.remove()
				return res.status(200).json({ msg: "User deleted successfully." })
			} catch (error) {
				if (error instanceof Error) {
					return res.status(400).json({
						error: error.message,

						message: "error in delete user controller",
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
