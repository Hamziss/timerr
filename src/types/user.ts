export interface IUser {
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
