import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"
import TextField from "@mui/material/TextField"
import { TransitionProps } from "@mui/material/transitions"
import Image from "next/image"
import React, { useState } from "react"
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
	const [imageSrc, setImageSrc] = useState(user.image)
	const [isloading, setIsloading] = useState(false)
	const [uploadData, setUploadData] = useState()
	const [userInfo, setUserInfo] = React.useState({
		firstName: user.firstName,
		lastName: user.lastName,
		username: user.username,
		bio: user.bio,
	})
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
	}
	function handleOnChangeImage(changeEvent: any) {
		const reader = new FileReader()

		// eslint-disable-next-line func-names
		reader.onload = function (onLoadEvent) {
			setImageSrc(onLoadEvent.target?.result as string)
			setUploadData(undefined)
		}

		reader.readAsDataURL(changeEvent.target.files[0])
	}

	async function handleOnSubmit(event: any) {
		setIsloading(true)
		event.preventDefault()

		const fileInput = document.querySelector(
			"input[type=file]"
		) as HTMLInputElement

		const formData = new FormData()

		// eslint-disable-next-line no-restricted-syntax
		if (fileInput?.files != null) {
			formData.append("file", fileInput.files[0])
		}

		formData.append("upload_preset", "my-uploads")

		const data = await fetch(
			"https://api.cloudinary.com/v1_1/dyzwu7mr1/image/upload",
			{
				method: "POST",
				body: formData,
			}
		).then(r => r.json())

		updateProfile(userInfo, data.secure_url)
		handleClose()
		setIsloading(false)
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
								src={imageSrc}
								width={120}
								height={120}
								objectFit="contain"
							/>
							{isloading && (
								<div>
									<CircularProgress />
								</div>
							)}
						</div>
						<form
							className={classes.form}
							method="post"
							onChange={handleOnChangeImage}
							onSubmit={handleOnSubmit}
						>
							<Button variant="contained" component="label">
								Upload File
								<input type="file" hidden name="file" accept="image/*" />
							</Button>
						</form>
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
					<Button onClick={handleClose}>Cancel</Button>
					<Button
						onClick={e => {
							handleOnSubmit(e)
						}}
					>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
