export interface IUser {
	_id: number
	email: string
	username: string
	firstName: string
	lastName: string
	password?: string
	createdAt: string
	updatedAt: string
	time: number
	__v: number
	coins: number
	sessions: number
	animals: any[]
	bio: string
	trees: any[]
	rank: string
	isAdmin: boolean
	image: string
}
