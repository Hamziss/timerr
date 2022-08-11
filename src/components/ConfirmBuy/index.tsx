import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"
import { TransitionProps } from "@mui/material/transitions"
import Image from "next/image"

import React from "react"
import { toast } from "react-toastify"
import Coin from "../../../public/images/Store/Coin.png"
import { IAnimal } from "../../types/animal"
import useStore from "../../zustand/store"
import AnimalCard from "../AnimalCard"
import classes from "./style.module.css"

type Props = {
	animal: IAnimal
	open: boolean
	handleClose: () => void
}
const Transition = React.forwardRef(
	(
		props: TransitionProps & {
			children: React.ReactElement<any, any>
		},
		ref: React.Ref<unknown>
	) => <Slide direction="up" ref={ref} {...props} />
)
const ConfirmBuy = ({ open, handleClose, animal }: Props) => {
	const { userState, buyAnimal } = useStore()
	const Price = userState.datauser.coins - animal.price

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
				<div className={classes.coinContainer}>
					<Image layout="fill" objectFit="contain" src={Coin} />
				</div>
				<DialogTitle>Confirm Purchase</DialogTitle>
				<DialogContent>
					<div className={classes.Container}>
						<AnimalCard animal={animal} />
						<div className={classes.moneyContainer}>
							<div>
								<span>Wallet</span>
								<span>{userState.datauser.coins}</span>
							</div>
							<div>
								<span>Animal Price</span>
								<span>{animal.price}</span>
							</div>
						</div>
						<div className={classes.total}>= {Price}</div>
					</div>
				</DialogContent>
				<DialogActions
					sx={{
						background: "#D9D9D9",
					}}
				>
					<Button onClick={handleClose}>Cancel</Button>
					<Button
						onClick={() => {
							if (
								Price >= 0 &&
								!userState.datauser.animals.some(a => a._id === animal._id)
							) {
								buyAnimal(animal)
							} else if (
								userState.datauser.animals.some(a => a._id === animal._id)
							) {
								toast.error("You already have this animal")
							} else {
								toast.error("You don't have enough money")
							}
							handleClose()
						}}
					>
						Purchase
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default ConfirmBuy
