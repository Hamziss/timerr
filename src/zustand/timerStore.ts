const timerState = {
	settings: {
		timepomodoro: 25,
		shortbreak: 5,
		longbreak: 15,
		longbreakevery: 4,
		autoStartPomodoros: false,
		autoStartShortBreaks: false,
		autoStartLongBreaks: false,
		activeAlarm: true,
		alarmVolume: 45,
	},
}

const timerStore = (set: any) => ({
	timerState,
	updateSettings: async (settings: any) => {
		set(
			(state: any) => {
				state.timerState.settings.timepomodoro = settings.timepomodoro
				state.timerState.settings.shortbreak = settings.shortbreak
				state.timerState.settings.longbreak = settings.longbreak
				state.timerState.settings.longbreakevery = settings.longbreakevery
				state.timerState.settings.activeAlarm = settings.activeAlarm
				state.timerState.settings.alarmVolume = settings.alarmVolume
				state.timerState.settings.autoStartPomodoros =
					settings.autoStartPomodoros
				state.timerState.settings.autoStartShortBreaks =
					settings.autoStartShortBreaks
				state.timerState.settings.autoStartLongBreaks =
					settings.autoStartLongBreaks
			},
			false,
			"timer/fetch_request"
		)
	},
})

export default timerStore
