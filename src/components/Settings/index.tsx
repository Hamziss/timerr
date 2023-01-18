import VolumeDown from "@mui/icons-material/VolumeDown"
import VolumeUp from "@mui/icons-material/VolumeUp"
import FormControlLabel from "@mui/material/FormControlLabel"
import Slider from "@mui/material/Slider"
import TextField from "@mui/material/TextField"
import React, { useEffect, useState } from "react"
import useClickOutside from "../../hooks/useClickOutside"
import { NOTE } from "../../utils/constants"
import useStore from "../../zustand/store"
import classes from "./style.module.css"
import { IOSSwitch } from "./switcher"

type Props = {
	setShowSettings: (showSettings: boolean) => void
	settingsZustand: any
}

const Settings = ({ setShowSettings, settingsZustand }: Props) => {
	const { updateSettings } = useStore()
	const [settings, setSettings] = useState({
		timepomodoro: settingsZustand.timepomodoro,
		shortbreak: settingsZustand.shortbreak,
		longbreak: settingsZustand.longbreak,
		longbreakevery: settingsZustand.longbreakevery,
		autoStartPomodoros: settingsZustand.autoStartPomodoros,
		autoStartShortBreaks: settingsZustand.autoStartShortBreaks,
		autoStartLongBreaks: settingsZustand.autoStartLongBreaks,
		activeAlarm: settingsZustand.activeAlarm,
		alarmVolume: settingsZustand.alarmVolume,
	})
	const domNode = useClickOutside(() => {
		setShowSettings(false)
	})

	const playDemo = () => {
		const audio = new Audio()
		audio.src = "/sounds/alarm.mp3"
		audio.loop = false
		audio.volume = settings.alarmVolume / 100
		audio.play()
	}

	const handleSwitchers = (event: React.SyntheticEvent, checked: boolean) => {
		const { name } = event.target as HTMLInputElement
		setSettings({ ...settings, [name]: checked })
	}

	const handleChangeSettings = (event: any) => {
		const { name, value } = event.target
		const convertedValue = Number(value)
		setSettings({ ...settings, [name]: convertedValue })
	}

	useEffect(() => {
		updateSettings(settings)
	}, [settings, updateSettings])
	return (
		<>
			<div className={classes.blackFilter} />
			<div ref={domNode} className={classes.windowWrapper}>
				<h1 className={classes.titleContainer}>Settings</h1>
				<div className={classes.sessionContainer}>
					<strong>Time</strong>
					<div>
						<div>
							<TextField
								id="outlined-number"
								label="Pomodoro"
								name="timepomodoro"
								type="number"
								InputLabelProps={{
									shrink: true,
								}}
								onChange={handleChangeSettings}
								defaultValue={settingsZustand.timepomodoro}
								sx={{ maxWidth: "100px" }}
								InputProps={{
									sx: { height: 46, backgroundColor: "#dfdfdf" },
									inputProps: { min: 1 },
								}}
							/>
						</div>
						<div>
							<TextField
								id="outlined-number"
								name="shortbreak"
								label="Short Break"
								type="number"
								InputLabelProps={{
									shrink: true,
								}}
								onChange={handleChangeSettings}
								defaultValue={settingsZustand.shortbreak}
								sx={{ maxWidth: "100px" }}
								InputProps={{
									inputProps: { min: 1 },
									sx: { height: 46, backgroundColor: "#dfdfdf" },
								}}
							/>
						</div>
						<div>
							<TextField
								id="outlined-number"
								label="Long Break"
								type="number"
								name="longbreak"
								InputLabelProps={{
									shrink: true,
								}}
								onChange={handleChangeSettings}
								defaultValue={settingsZustand.longbreak}
								InputProps={{
									inputProps: { min: 1 },
									sx: { height: 46, backgroundColor: "#dfdfdf" },
								}}
								sx={{ maxWidth: "100px" }}
							/>
						</div>
						<div>
							<TextField
								id="outlined-number"
								label="Long Break Intervals"
								type="number"
								name="longbreakevery"
								InputLabelProps={{
									shrink: true,
								}}
								onChange={handleChangeSettings}
								defaultValue={settingsZustand.longbreakevery}
								InputProps={{
									inputProps: { min: 1 },
									sx: { height: 46, backgroundColor: "#dfdfdf" },
								}}
								sx={{ maxWidth: "150px" }}
							/>
						</div>
					</div>

					<p className={classes.note}>
						<span>Note:</span> {NOTE}
					</p>
				</div>
				<div className={classes.startContainer}>
					<strong>Starts</strong>
					<div>
						Auto Start Pomodoros ?
						<FormControlLabel
							control={<IOSSwitch sx={{ m: 1 }} />}
							label=""
							name="autoStartPomodoros"
							onChange={handleSwitchers}
							checked={settingsZustand.autoStartPomodoros}
						/>
					</div>
					<div>
						Auto Start Short Breaks ?
						<FormControlLabel
							control={<IOSSwitch sx={{ m: 1 }} />}
							label=""
							name="autoStartShortBreaks"
							onChange={handleSwitchers}
							checked={settingsZustand.autoStartShortBreaks}
						/>
					</div>
					<div>
						Auto Start Long Breaks ?
						<FormControlLabel
							control={<IOSSwitch sx={{ m: 1 }} />}
							label=""
							name="autoStartLongBreaks"
							onChange={handleSwitchers}
							checked={settingsZustand.autoStartLongBreaks}
						/>
					</div>
				</div>
				<strong className={classes.alarmStrong}>Alarm</strong>
				<div className={classes.alarmBox}>
					Activate Alarm Sound ?
					<FormControlLabel
						control={<IOSSwitch sx={{ m: 1 }} />}
						label=""
						name="activeAlarm"
						onChange={handleSwitchers}
						checked={settingsZustand.activeAlarm}
					/>
				</div>
				<div className={classes.alarmBox}>
					<span>Alarm Sound</span>
					<button type="submit" onClick={playDemo}>
						Demo
					</button>
					<div className={classes.volumeContainer}>
						<VolumeDown />
						<Slider
							aria-label="Volume"
							name="alarmVolume"
							value={settingsZustand.alarmVolume}
							onChange={handleChangeSettings}
						/>
						<VolumeUp />
					</div>
				</div>

				<div className={classes.DarkmodeContainer} />
			</div>
		</>
	)
}

export default Settings
