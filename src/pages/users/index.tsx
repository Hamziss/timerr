import { useSession } from "next-auth/react"
import Image from "next/image"
import trophee from "../../../public/images/Users/trophee.png"

import circle from "../../../public/images/Home/circle.png"
import rightCircle from "../../../public/images/Users/rightCircle.png"
import Podium from "../../components/Podium"
import RankingTable from "../../components/RankingTable"
import getData from "../../services/fetchData/getData"
import classes from "../../styles/users.module.css"
import NotFoundPage from "../404"

type Props = {
	users: any
}
const Users = ({ users }: Props) => {
	const { status } = useSession()
	if (status === "unauthenticated") {
		return <NotFoundPage />
	}

	return (
		<div>
			<div className={classes.Wrapper}>
				<div className={classes.title}>
					<h1>Ranking</h1>
					<Image width={50} height={50} src={trophee} />
				</div>
				<div className={classes.circleContainer}>
					<Image layout="responsive" src={circle} />
				</div>
				<div className={classes.rightCircle}>
					<Image layout="responsive" src={rightCircle} />
				</div>
				<div className={classes.rankingContainer}>
					<Podium users={users} />
					<RankingTable users={users} />
				</div>
			</div>
		</div>
	)
}

export default Users

export async function getServerSideProps() {
	const res = await getData("users")

	const { users } = res

	return {
		props: { users },
	}
}
