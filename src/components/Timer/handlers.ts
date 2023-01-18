import { toast } from "react-toastify"
import { ISettings } from "../../types/settings"
import { updateFavicon } from "../../utils/helpers"

export default function completeHandler({
	settings,
	setmode,
	setTimer,
	pomodoroCount,
	mode,
	setPomodoroCount,
	start,
	reset,
	updateUserSession,
	status,
}: any) {
	if (settings.activeAlarm) {
		const audio = new Audio()
		audio.src = "/sounds/alarm.mp3"
		audio.loop = false
		audio.volume = settings.alarmVolume / 100
		audio.play()
	}

	if (mode === "POMODORO" && pomodoroCount < settings.longbreakevery) {
		setPomodoroCount(pomodoroCount + 1)
		setmode("SHORT_BREAK")
		setTimer(settings.shortbreak)

		if (status === "authenticated") {
			updateUserSession(settings.timepomodoro)
			toast.success(
				`Congrats! You Won ${settings.timepomodoro * 50} Coins & Tree!`
			)
		}
		reset()
		if (settings.autoStartShortBreaks) {
			start()
		}
	} else if (mode === "POMODORO" && pomodoroCount === settings.longbreakevery) {
		setPomodoroCount(pomodoroCount + 1)
		setmode("LONG_BREAK")
		setTimer(settings.longbreak)
		if (status === "authenticated") {
			updateUserSession(settings.timepomodoro)
			toast.success(
				`Congrats! You Won ${settings.timepomodoro * 50} Coins & Tree!`
			)
		}
		reset()
		if (settings.autoStartLongBreaks) {
			start()
		}
	} else if (mode === "SHORT_BREAK") {
		setmode("POMODORO")
		setTimer(settings.timepomodoro)
		reset()
		if (settings.autoStartPomodoros) {
			start()
		}
	} else if (mode === "LONG_BREAK") {
		setmode("POMODORO")
		setTimer(settings.timepomodoro)
		reset()
		if (settings.autoStartPomodoros) {
			start()
		}
	}
}

export const handleMode = (
	mode: string,
	setmode: Function,
	setTimer: Function,
	settings: ISettings,
	reset: Function
) => {
	if (mode === "SHORT_BREAK") {
		setmode("SHORT_BREAK")
		setTimer(settings.shortbreak)
	} else if (mode === "LONG_BREAK") {
		setmode("LONG_BREAK")
		setTimer(settings.longbreak)
	} else if (mode === "POMODORO") {
		setmode("POMODORO")
		setTimer(settings.timepomodoro)
	}
	reset()
	updateFavicon(mode)
}
