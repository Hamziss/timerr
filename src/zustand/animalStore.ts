import axios from "axios"
import { IAnimal } from "../types/animal"

const animalState = {
	animals: [] as unknown as IAnimal,
	loading: true,
	error: undefined,
}

const animalStore = (set: any) => ({
	animalState,
	getAnimals: async () => {
		set(
			(state: any) => {
				state.animalState.loading = true
			},
			false,
			"animals/fetch_request"
		)
		try {
			const res = await axios.get("/api/animals")
			set(
				(state: any) => {
					state.animalState.loading = false
					state.animalState.animals = res.data.animals
				},
				false,
				"animals/fetch_success"
			)
		} catch (err) {
			set(
				(state: any) => {
					state.animalState.loading = false
					state.animalState.error = err
				},
				false,
				"animals/fetch_error"
			)
		}
	},
	// updateAnimals: async(animals) => {
	//     set((state) => { state.animalState.animals = animals; })
	// },
})

export default animalStore
