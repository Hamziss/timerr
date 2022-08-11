import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"
import TextField from "@mui/material/TextField"
import { TransitionProps } from "@mui/material/transitions"
import Image from "next/image"
import React from "react"
import bg from "../../../public/images/Users/bg.png"
import { IUser } from "../../types/user"
import useStore from "../../zustand/store"
import classes from "./style.module.css"

interface Props {
	open: boolean
	handleClose: () => void
	user: IUser
}

const Transition = React.forwardRef(
	(
		props: TransitionProps & {
			children: React.ReactElement<any, any>
		},
		ref: React.Ref<unknown>
	) => <Slide direction="up" ref={ref} {...props} />
)

export default function EditProfile({ open, handleClose, user }: Props) {
	const { updateProfile } = useStore()
	const [userInfo, setUserInfo] = React.useState({
		firstName: user.firstName,
		lastName: user.lastName,
		username: user.username,
		image: user.image,
		bio: user.bio,
	})
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
	}

	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				className={classes.dialog}
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle>Edit Profile</DialogTitle>
				<DialogContent>
					<div className={classes.Container}>
						<div className={classes.bg}>
							<Image objectFit="cover" layout="fill" src={bg} />
						</div>
						<div className={classes.profilepic}>
							<Image
								className={classes.profilepic__image}
								src={userInfo.image}
								width={120}
								height={120}
							/>
							<div className={classes.profilepic__content}>
								<span className={classes.profilepic__icon}>
									<i className="fas fa-camera" />
								</span>
								<span className={classes.profilepic__text}>Edit Picture</span>
							</div>
						</div>
						<div className={classes.BoxField}>
							<TextField
								hiddenLabel
								fullWidth
								id="filled-hidden-label-normal"
								label="First Name"
								variant="outlined"
								name="firstName"
								onChange={handleChange}
								value={userInfo.firstName}
							/>
							<TextField
								hiddenLabel
								name="lastName"
								fullWidth
								id="filled-hidden-label-normal"
								value={userInfo.lastName}
								label="Last Name"
								variant="outlined"
								onChange={handleChange}
							/>
							<TextField
								hiddenLabel
								id="filled-hidden-label-normal"
								label="Username"
								fullWidth
								value={userInfo.username}
								name="username"
								variant="outlined"
								onChange={handleChange}
							/>
							<TextField
								hiddenLabel
								id="filled-hidden-label-normal"
								value={userInfo.bio}
								fullWidth
								multiline
								label="Bio"
								name="bio"
								maxRows={5}
								variant="outlined"
								onChange={handleChange}
							/>
						</div>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Disagree</Button>
					<Button
						onClick={() => {
							updateProfile(userInfo)

							handleClose()
						}}
					>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
