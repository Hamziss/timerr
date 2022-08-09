/* eslint-disable no-plusplus */
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
		return {
			name: "simple tree",
			image:
				"https://res.cloudinary.com/dyzwu7mr1/image/upload/v1660066232/tree_oatcex.png",
		}
	}
	if (time > 24) {
		return {
			name: "japense tree",
			image:
				"https://res.cloudinary.com/dyzwu7mr1/image/upload/v1660070255/dlpng_com_Pink_Tree_PNG_Clipart_Image___Gallery_Yopriceville_-_High-Quality_____3894827-pink-tree-png-clipart-image-gallery-yopriceville-high-quality-flower-tree-png-6360_5560_2_io7cc4.png",
		}
	}
	if (time > 15) {
		return {
			name: "Europeen tree",
			image:
				"https://res.cloudinary.com/dyzwu7mr1/image/upload/v1660070323/pngwing_5_mwozwl.png",
		}
	}
	return {
		name: "simple tree",
		image:
			"https://res.cloudinary.com/dyzwu7mr1/image/upload/v1660066232/tree_oatcex.png",
	}
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

export function GetRowTree(trees: any[], rows: number) {
	let row: any = []
	// eslint-disable-next-line no-plusplus
	const checkarrow = trees.length - rows
	if (checkarrow < 8) {
		let i = rows
		while (i < trees.length) {
			row = [...row, trees[i]]
			i++
		}
	} else {
		let i = rows
		while (i < 8) {
			row = [...row, trees[i]]
			i++
		}
	}

	return row
}
