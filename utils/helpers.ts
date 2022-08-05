import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"

dayjs.extend(duration)
export function formatTime(time: number) {
	return dayjs.duration(time, "seconds").format("mm:ss")
}

export function updateTitle(time: number, mode: string) {
	const message = mode === "POMODORO" ? "Time To Focus !" : "Break Time !"
	return `${formatTime(time)} - ${message}`
}

function getFaviconElement() {
	return document.getElementById("favicon") as HTMLLinkElement
}

export function updateFavicon(mode: string) {
	const favicon = getFaviconElement()
	switch (mode) {
		case "POMODORO":
			favicon.href = "/images/favicon.ico"
			break
		case "SHORT_BREAK":
			favicon.href = "/images/iconbreak.ico"
			break
		case "LONG_BREAK":
			favicon.href = "/images/iconbreak.ico"
			break
		default:
			break
	}
}
export function choosetree(time: number) {
	if (time > 30) {
		return "japanese tree"
	}
	if (time > 24) {
		return "european tree"
	}
	if (time > 15) {
		return "american tree"
	}
	return "brazilian tree"
}
