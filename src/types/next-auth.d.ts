import "next-auth"

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			_id: number
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
			isAdmin: boolean
			image: string
		}
	}
}
