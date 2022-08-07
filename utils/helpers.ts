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
export function getRandomQuote(array: any[]) {
	const randomIndex = Math.floor(Math.random() * array.length)

	const item: any = array[randomIndex]

	return item
}
export function chooseBgColorCard(rarety: string) {
	switch (rarety) {
		case "epique":
			return "#FFB23A"
		case "rare":
			return "#8ABDEC"
		case "legendary":
			return "#3D396D"
		default:
			return ""
	}
}

export function choosebgColorUpperDivCard(rarety: string) {
	switch (rarety) {
		case "epique":
			return "#FF9F0B"
		case "rare":
			return "#4A8DCA"
		case "legendary":
			return "#322D6B"
		default:
			return "black"
	}
}
