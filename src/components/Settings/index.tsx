import FormControlLabel from "@mui/material/FormControlLabel"
import { styled } from "@mui/material/styles"
import Switch, { SwitchProps } from "@mui/material/Switch"
import TextField from "@mui/material/TextField"
import React, { useEffect, useState } from "react"
import useClickOutside from "../../hooks/useClickOutside"
import useStore from "../../zustand/store"
import classes from "./style.module.css"

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
	})
	const domNode = useClickOutside(() => {
		setShowSettings(false)
	})

	const handleAutoShortBreaks = (
		event: React.SyntheticEvent,
		checked: boolean
	) => {
		setSettings({ ...settings, autoStartShortBreaks: checked })
	}
	const handleAutoStartPomodoros = (
		event: React.SyntheticEvent,
		checked: boolean
	) => {
		setSettings({ ...settings, autoStartPomodoros: checked })
	}
	const handleAutoStartLongBreaks = (
		event: React.SyntheticEvent,
		checked: boolean
	) => {
		setSettings({ ...settings, autoStartLongBreaks: checked })
	}
	const handleChangeSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
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
								InputProps={{ sx: { height: 46, backgroundColor: "#dfdfdf" } }}
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
								InputProps={{ sx: { height: 46, backgroundColor: "#dfdfdf" } }}
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
								InputProps={{ sx: { height: 46, backgroundColor: "#dfdfdf" } }}
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
								InputProps={{ sx: { height: 46, backgroundColor: "#dfdfdf" } }}
								sx={{ maxWidth: "150px" }}
							/>
						</div>
					</div>
				</div>
				<div className={classes.startContainer}>
					<strong>Starts</strong>{" "}
					<div>
						Auto Start Pomodoros ?
						<FormControlLabel
							control={<IOSSwitch sx={{ m: 1 }} />}
							label=""
							name="autoStartPomodoros"
							onChange={handleAutoStartPomodoros}
							checked={settingsZustand.autoStartPomodoros}
						/>
					</div>
					<div>
						Auto Start Short Breaks ?
						<FormControlLabel
							control={<IOSSwitch sx={{ m: 1 }} />}
							label=""
							name="autoStartShortBreaks"
							onChange={handleAutoShortBreaks}
							checked={settingsZustand.autoStartShortBreaks}
						/>
					</div>
					<div>
						Auto Start Long Breaks ?
						<FormControlLabel
							control={<IOSSwitch sx={{ m: 1 }} />}
							label=""
							name="autoStartLongBreaks"
							onChange={handleAutoStartLongBreaks}
							checked={settingsZustand.autoStartLongBreaks}
						/>
					</div>
				</div>
				<div className={classes.DarkmodeContainer} />
			</div>
		</>
	)
}
const IOSSwitch = styled((props: SwitchProps) => (
	<Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
	width: 42,
	height: 26,
	padding: 0,
	"& .MuiSwitch-switchBase": {
		padding: 0,
		margin: 2,
		transitionDuration: "300ms",
		"&.Mui-checked": {
			transform: "translateX(16px)",
			color: "#fff",
			"& + .MuiSwitch-track": {
				backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
				opacity: 1,
				border: 0,
			},
			"&.Mui-disabled + .MuiSwitch-track": {
				opacity: 0.5,
			},
		},
		"&.Mui-focusVisible .MuiSwitch-thumb": {
			color: "#33cf4d",
			border: "6px solid #fff",
		},
		"&.Mui-disabled .MuiSwitch-thumb": {
			color:
				theme.palette.mode === "light"
					? theme.palette.grey[100]
					: theme.palette.grey[600],
		},
		"&.Mui-disabled + .MuiSwitch-track": {
			opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
		},
	},
	"& .MuiSwitch-thumb": {
		boxSizing: "border-box",
		width: 22,
		height: 22,
	},
	"& .MuiSwitch-track": {
		borderRadius: 26 / 2,
		backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
		opacity: 1,
		transition: theme.transitions.create(["background-color"], {
			duration: 500,
		}),
	},
}))
export default Settings
