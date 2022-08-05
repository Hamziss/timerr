import { useEffect } from "react"
import useStore from "../../zustand/store"

type Props = {}

const Store = (props: Props) => {
	const { getAnimals, animalState } = useStore()
	useEffect(() => {
		getAnimals()
	}, [getAnimals])
	console.log(animalState)
	return <div>index</div>
}

export default Store
