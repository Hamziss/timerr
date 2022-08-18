import Link from "next/link"
import { FormatTimetoHours } from "../../../utils/helpers"
import { IUser } from "../../types/user"
import classes from "./style.module.css"

type Props = {
	users: IUser[]
}

const RankingTable = ({ users }: Props) => (
	<div className={classes.tableWrapper}>
		<div className={classes.Header}>
			<span>#Rank</span>
			<span>Username</span>
			<span>Time</span>
			<span>Session</span>
		</div>
		<div className={classes.contentContainer}>
			{users.map((user: IUser, index: number) => {
				if (index < 3) {
					return null
				}
				return (
					<div key={user._id} className={classes.row}>
						<span>{index + 1}</span>
						<Link href={`/users/${user._id}`}>
							<span style={{ cursor: "pointer" }}>{user.username}</span>
						</Link>
						<span>{FormatTimetoHours(user.time)}</span>
						<span>{user.sessions}</span>
					</div>
				)
			})}
		</div>
	</div>
)
export default RankingTable
