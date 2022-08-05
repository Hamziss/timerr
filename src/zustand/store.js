import create from "zustand"
import { devtools, persist } from "zustand/middleware"

import animalStore from "./animalStore"
import timerStore from "./timerStore"
import userStore from "./userStore"

let combineStores = (set, get) => ({
    ...animalStore(set, get),
    ...userStore(set, get),
    ...timerStore(set, get),
})

combineStores = devtools(combineStores)

combineStores = persist(combineStores, {
    name: "zustand",
    getStorage: () => sessionStorage,
    partialize: state => ({
        userState: state.userState,
        timerState: state.timerState,
    }),
})

export default create(combineStores)