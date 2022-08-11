/* eslint-disable no-param-reassign */
import bcrypt from "bcrypt"
import type { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Users from "../../../../models/user"
import connectDB from "../../../../utils/connectDB"

connectDB()
export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			id: "credentials",
			name: "my-project",
			credentials: {
				email: {
					label: "email",
					type: "email",
					placeholder: "jsmith@example.com",
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
			user && (token.user = user)
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
