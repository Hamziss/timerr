import create from "zustand"
import { devtools, persist } from "zustand/middleware"

import animalStore from "./animalStore"
import timerStore from "./timerStore"
import userStore from "./userStore"

let combineStores = (set: any) => ({
	...animalStore(set),
	...userStore(set),
	...timerStore(set),
})

combineStores = devtools(combineStores) as any

combineStores = persist(combineStores, {
	name: "zustand",
	getStorage: () => sessionStorage,
	partialize: state => ({
		userState: state.userState,
		timerState: state.timerState,
	}),
})

export default create(combineStores)
