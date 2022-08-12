import axios from "axios"
import jwt from "jsonwebtoken"
import { toast } from "react-toastify"
import { choosetree } from "../../utils/helpers"
import { IAnimal } from "../types/animal"
import { IUser } from "../types/user"

const userState = {
	datauser: {} as unknown as IUser,
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

			const { user } = res.data
			set(
				(state: any) => {
					state.userState.loading = false
					state.userState.datauser = user
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
	updateUserSession: async (timepomodoro: number) => {
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
		const { user } = res.data
		set((state: any) => {
			state.userState.datauser = user
		})
	},
	updateProfile: async (user: any, image: any) => {
		const { firstName, lastName, username, bio } = user
		const res = await axios.put("/api/users", {
			firstName,
			lastName,
			image,
			username,
			bio,
		})
		const { user: userUpdated } = res.data
		if (res.status === 200) {
			set((state: any) => {
				state.userState.datauser = userUpdated
			})
			window.location.reload()
		} else {
			set((state: any) => {
				state.userState.error = res.data.error
			})
		}
	},
	buyAnimal: async (animal: IAnimal) => {
		const res = await axios.post(
			"/api/users/store",
			{
				animal,
			},
			{
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
				},
			}
		)

		if (res.status === 200) {
			const { user } = res.data
			toast.success(res.data.message)
			set((state: any) => {
				state.userState.datauser = user
			})
		}
	},
	logout: () => {
		set((state: any) => {
			state.userState.datauser = {}
		})
	},
})

export default userStore
