/* eslint-disable no-param-reassign */
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import bcrypt from "bcrypt"
import type { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider, { GithubProfile } from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import Users from "../../../../models/user"
import connectDB from "../../../utils/connectDB"
import clientPromise from "../../../utils/mongodb"

connectDB()
export const authOptions: NextAuthOptions = {
	adapter: MongoDBAdapter(clientPromise),
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
			profile(profile: GithubProfile) {
				return {
					id: profile.id.toString(),
					email: profile.email,
					firstName: profile.name ?? profile.login,
					lastName: "",
					image: profile.avatar_url,
					coins: 0,
					sessions: 0,
					animals: [],
					trees: [],
					rank: "bronze",
					username: profile.login,
					bio: "",
					time: 0,
					isAdmin: false,
				}
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			profile(profile) {
				return {
					id: profile.sub,
					email: profile.email,
					firstName: profile.name.split(" ")[0],
					lastName: profile.name.split(" ")[1],
					image: profile.picture,
					coins: 0,
					sessions: 0,
					animals: [],
					trees: [],
					rank: "bronze",
					username: profile.name,
					bio: "",
					time: 0,
					isAdmin: false,
				}
			},
		}),

		CredentialsProvider({
			id: "credentials",
			name: "my-project",
			credentials: {
				email: {
					label: "email",
					type: "email",
					placeholder: "js@example.com",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials: any) {
				const { email, password } = credentials

				const user = await Users.findOne({ email })
				if (!user) throw new Error("Incorrect password or email.")

				const isMatch = await bcrypt.compare(password, user.password as string)
				if (!isMatch) throw new Error("Incorrect password or email.")

				return user.toObject()
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/auth/signin",
	},
	callbacks: {
		jwt: async ({ token, user }) => {
			user &&
				(token.user = {
					id: user._id ? user._id : user.id,
					email: user.email,
					image: user.image,
					username: user.username,
					isAdmin: user.isAdmin,
				})
			return token
		},
		session: async ({ session, token }) => {
			session.user = token.user as any
			return session
		},
	},
	session: { strategy: "jwt" },
	theme: {
		colorScheme: "auto", // "auto" | "dark" | "light"
		brandColor: "", // Hex color code #33FF5D
		logo: "/vercel.svg", // Absolute URL to image
	},
	// Enable debug messages
	debug: process.env.NODE_ENV === "development",
}
export default NextAuth(authOptions)
