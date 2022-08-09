import axios from "axios"
import jwt from "jsonwebtoken"
import { choosetree } from "../../utils/helpers"
import { IUser } from "../types/user"

const userState = {
	datauser: [] as unknown as IUser,
	loading: false,
	error: undefined,
}
const token = jwt.sign(
	{
		hasAccess: true,
	},
	process.env.NEXT_PUBLIC_SECRET_SESSION!
)
const userStore = (set: any) => ({
	userState,
	getUser: async (id: number) => {
		set(
			(state: any) => {
				state.userState.loading = true
			},
			false,
			"users/fetch_request"
		)

		try {
			const res = await axios.get(`/api/users/${id}`)
			set(
				(state: any) => {
					state.userState.loading = false
					state.userState.datauser = res.data
				},
				false,
				"users/fetch_success"
			)
		} catch (err) {
			set(
				(state: any) => {
					state.userState.loading = false
					state.userState.error = err
				},
				false,
				"users/fetch_error"
			)
		}
	},
	updateUser: async (timepomodoro: number) => {
		const { name, image } = choosetree(timepomodoro)
		const headers = {
			Authorization: token,
		}
		const res = await axios.put(
			"/api/sessions",
			{
				time: timepomodoro,
				name,
				image,
			},
			{ headers }
		)
		set((state: any) => {
			state.userState.datauser = res.data.user
		})
	},
	logout: () => {
		set((state: any) => {
			state.userState.datauser = {}
		})
	},
})

export default userStore
