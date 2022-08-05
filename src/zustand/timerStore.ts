const timerState = {
	settings: {
		timepomodoro: 1,
		shortbreak: 1,
		longbreak: 2,
		longbreakevery: 4,
	},
}

const timerStore = (set: any) => ({
	timerState,
	updateSettings: async (settings: any) => {
		set(
			(state: any) => {
				state.timerState.settings.timepodmoro = settings.timepodmoro
				state.timerState.settings.shortbreak = settings.shortbreak
				state.timerState.settings.longbreak = settings.longbreak
				state.timerState.settings.longbreakevery = settings.longbreakevery
			},
			false,
			"animals/fetch_request"
		)
	},
})

export default timerStore
