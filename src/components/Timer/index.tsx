import PauseIcon from "@mui/icons-material/Pause"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import RestartAltIcon from "@mui/icons-material/RestartAlt"
import SettingsIcon from "@mui/icons-material/Settings"
import { useSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
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
import Settings from "../Settings"
import completeHandler, { handleMode } from "./handlers"
import RadialSeparators from "./Separtors"
import classes from "./style.module.css"

const Timer = () => {
	// state
	const { updateUserSession, timerState } = useStore()
	const { settings } = timerState
	const { status } = useSession()
	const [timer, setTimer] = useState(0)
	const [mode, setmode] = useState("POMODORO")
	const [showSettings, setShowSettings] = useState(false)
	const [pomodoroCount, setPomodoroCount] = useState(0)

	const { ticking, start, stop, reset, timeLeft, progress } = useCountdown({
		minutes: timer,
		onStart: () => {
			updateFavicon(mode)
		},
		onComplete: () => {
			completeHandler({
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
			})
		},
	})

	const toggleTimer = useCallback(() => {
		if (ticking) {
			stop()
		} else {
			start()
		}
	}, [start, stop, ticking])

	useEffect(() => {
		// rerender when settings changes
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
	}, [showSettings, settings, mode])
	return (
		<>
			<Head>
				<title>{updateTitle(timeLeft, mode)}</title>
			</Head>
			{showSettings && (
				<Settings
					settingsZustand={settings}
					setShowSettings={setShowSettings}
				/>
			)}
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
						onClick={() =>
							handleMode("POMODORO", setmode, setTimer, settings, reset)
						}
					>
						Pomodoro
					</button>
					<button
						style={{
							backgroundColor: mode === "SHORT_BREAK" ? "#4483ff" : "#fec84c",
						}}
						type="submit"
						onClick={() =>
							handleMode("SHORT_BREAK", setmode, setTimer, settings, reset)
						}
					>
						Small Break
					</button>
					<button
						style={{
							backgroundColor: mode === "LONG_BREAK" ? "#4483ff" : "#fec84c",
						}}
						type="submit"
						onClick={() =>
							handleMode("LONG_BREAK", setmode, setTimer, settings, reset)
						}
					>
						Long Break
					</button>
					<button type="submit" onClick={() => setShowSettings(true)}>
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
								height: "6%",
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
							<span className={classes.rounds}>Round : {pomodoroCount}</span>
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
const styleBtn = {
	height: "4vw",
	width: "4vw",
	maxWidth: "50px",
	maxHeight: "50px",
	color: "#4483ff",
}
export default Timer
