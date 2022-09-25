import "next-auth"

declare module "next-auth" {
	interface Session {
		user: {
			id: number
			email: string
			firstName: string
			lastName: string
			password?: string
			createdAt: string
			updatedAt: string
			__v: number
			sessions: number
			coins: number
			animals: any[]
			trees: any[]
			rank: string
			username: string
			bio: string
			isAdmin: boolean
			image: string
		}
	}
}
