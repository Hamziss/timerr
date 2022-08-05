import PauseIcon from "@mui/icons-material/Pause"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import RestartAltIcon from "@mui/icons-material/RestartAlt"
import SettingsIcon from "@mui/icons-material/Settings"
import { useSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import { useCallback, useState } from "react"
import {
	buildStyles,
	CircularProgressbarWithChildren,
} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import Bousole from "../../../public/images/Home/bousole.png"
import Clock from "../../../public/images/Home/Clock.png"
import { formatTime, updateFavicon, updateTitle } from "../../../utils/helpers"
import useCountdown from "../../hooks/useCountdown"
import useStore from "../../zustand/store"
import RadialSeparators from "./Separtors"
import classes from "./style.module.css"

const styleBtn = {
	height: "4vw",
	width: "4vw",
	maxWidth: "50px",
	maxHeight: "50px",
	color: "#4483ff",
}

const Timer = () => {
	const { updateUser, timerState } = useStore()
	const { settings } = timerState
	const [mode, setmode] = useState("POMODORO")
	const { status } = useSession()
	const [timer, setTimer] = useState(settings.timepomodoro)
	const [pomodoroCount, setPomodoroCount] = useState(0)
	const { ticking, start, stop, reset, timeLeft, progress } = useCountdown({
		minutes: timer,
		onStart: () => {
			updateFavicon(mode)
		},
		onStop: () => {
			// if (mode === POMODORO) {
			// 	tickingAudio.stop()
			// }
		},
		onComplete: () => {
			setPomodoroCount(pomodoroCount + 1)
			if (mode === "POMODORO" && pomodoroCount < settings.longbreakevery) {
				setmode("SHORT_BREAK")
				setTimer(settings.shortbreak)
				if (status === "authenticated") {
					updateUser(settings.timepomodoro)
				}
			} else if (
				mode === "POMODORO" &&
				pomodoroCount === settings.longbreakevery
			) {
				setmode("LONG_BREAK")
				setTimer(settings.longbreak)
				if (status === "authenticated") {
					updateUser(settings.timepomodoro)
				}
			} else if (mode === "SHORT_BREAK") {
				setmode("POMODORO")
				setTimer(settings.timepomodoro)
			} else if (mode === "LONG_BREAK") {
				setmode("POMODORO")
				setTimer(settings.timepomodoro)
			}
			reset()
		},
	})
	// eslint-disable-next-line no-shadow
	const handleMode = (mode: string) => {
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
	const toggleTimer = useCallback(() => {
		if (ticking) {
			stop()
		} else {
			start()
		}
	}, [start, stop, ticking])
	return (
		<>
			<Head>
				<title>{updateTitle(timeLeft, mode)}</title>
			</Head>
			<div className={classes.timerContainer}>
				<div className={classes.clockContainer}>
					<Image priority layout="fill" placeholder="blur" src={Clock} />
				</div>
				<div className={classes.controlBtn}>
					<button
						style={{
							backgroundColor: mode === "POMODORO" ? "#ff3939" : "#fec84c",
						}}
						type="submit"
						onClick={() => handleMode("POMODORO")}
					>
						Pomodoro
					</button>
					<button
						style={{
							backgroundColor: mode === "SHORT_BREAK" ? "#4483ff" : "#fec84c",
						}}
						type="submit"
						onClick={() => handleMode("SHORT_BREAK")}
					>
						Small Break
					</button>
					<button
						style={{
							backgroundColor: mode === "LONG_BREAK" ? "#4483ff" : "#fec84c",
						}}
						type="submit"
						onClick={() => handleMode("LONG_BREAK")}
					>
						Long Break
					</button>
					<button type="submit">
						<SettingsIcon />
					</button>
				</div>
				<div className={classes.countDownContainer}>
					<CircularProgressbarWithChildren
						strokeWidth={6}
						styles={buildStyles({
							strokeLinecap: "butt",
							pathColor: mode === "POMODORO" ? "#ff3939" : "#4483ff",
							trailColor: "#cbcbcb",
						})}
						value={progress}
					>
						<RadialSeparators
							count={17}
							style={{
								background: "#fff",
								width: "1px",

								height: `${6}%`,
							}}
						/>
						<div
							className={classes.insideContainer}
							style={{ fontSize: 12, marginTop: -5 }}
						>
							<span className={classes.time}>{formatTime(timeLeft)}</span>
							<button type="submit" onClick={toggleTimer}>
								{ticking ? (
									<PauseIcon
										sx={{
											height: "4vw",
											width: "4vw",
											maxWidth: "50px",
											maxHeight: "50px",
											color: "#ff3939",
										}}
									/>
								) : (
									<PlayArrowIcon sx={styleBtn} />
								)}
							</button>
							<button type="submit" onClick={reset}>
								<RestartAltIcon sx={styleBtn} />
							</button>
						</div>
					</CircularProgressbarWithChildren>
				</div>
				<div className={classes.bousoleContainer}>
					<Image
						priority
						layout="fill"
						src={Bousole}
						alt="bousole"
						placeholder="blur"
					/>
				</div>
			</div>
		</>
	)
}

export default Timer
