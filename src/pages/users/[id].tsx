import { GetServerSideProps } from "next"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { ParsedUrlQuery } from "querystring"
import { useState } from "react"
import bg from "../../../public/images/Users/bg.png"
import pencil from "../../../public/images/Users/pencil.png"
import AnimalCard from "../../components/AnimalCard"
import EditProfile from "../../components/EditProfile"
import getData from "../../services/fetchData/getData"
import classes from "../../styles/user.module.css"
import { IUser } from "../../types/user"
import NotFoundPage from "../404"

type Props = {
	user: IUser
}
interface IParams extends ParsedUrlQuery {
	id: string
}

const UserPage = ({ user }: Props) => {
	const { data, status } = useSession()
	const [open, setOpen] = useState(false)

	if (status === "unauthenticated") {
		return <NotFoundPage />
	}
	const handleClickOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}

	return (
		<div className={classes.Wrapper}>
			<div className={classes.profileContainer}>
				<div className={classes.upperContainer}>
					<div className={classes.bgContainer}>
						<Image objectFit="cover" layout="fill" src={bg} />
					</div>
					<div className={classes.dataContainer}>
						<div className={classes.profileImage}>
							<Image objectFit="contain" layout="fill" src={user.image} />
						</div>
						{data?.user?._id === user._id && (
							<>
								<button
									onClick={handleClickOpen}
									className={classes.editBtn}
									type="submit"
								>
									<Image height={10} width={10} src={pencil} /> Edit Profile
								</button>

								<EditProfile
									user={user}
									open={open}
									handleClose={handleClose}
								/>
							</>
						)}
						<span className={classes.username}>{user.username}</span>
						<span>{user.bio}</span>
					</div>
				</div>
				<div className={classes.lowerContainer}>
					<span>Animals</span>
					<div className={classes.cardContainer}>
						{user.animals.map(animal => (
							<AnimalCard key={animal._id} animal={animal} />
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserPage

export const getServerSideProps: GetServerSideProps = async context => {
	const { id } = context.params as IParams

	const res: any = await getData(`users/${id}`)

	const { user } = res

	return {
		props: { user },
	}
}
