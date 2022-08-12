import Image from "next/image"
import Link from "next/link"
import third from "../../../public/images/Users/3.png"
import firstPlace from "../../../public/images/Users/firstPlace.png"
import secondPlace from "../../../public/images/Users/secondPlace.png"
import { FormatTimetoHours } from "../../../utils/helpers"
import { IUser } from "../../types/user"
import classes from "./style.module.css"

type Props = {
	users: IUser[]
}

const Podium = ({ users }: Props) => (
	<div className={classes.firstThree}>
		<div className={classes.secondRank}>
			<div>
				<Image height={50} width={50} src={secondPlace} />
			</div>
			<Link href={`/users/${users[1]._id}`}>
				<div>
					<div>
						<Image height={60} width={60} src={users[1].image} />
					</div>
					<span className={classes.name2}>{users[1].username}</span>
					<span className={classes.session}>
						{FormatTimetoHours(users[1].time)}
					</span>
				</div>
			</Link>
		</div>
		<div className={classes.firstRank}>
			<div>
				<Image height={65} width={65} src={firstPlace} />
			</div>
			<Link href={`/users/${users[0]._id}`}>
				<div>
					<div>
						<Image height={60} width={60} src={users[0].image} />
					</div>
					<span className={classes.name}>{users[0].username}</span>
					<span className={classes.session}>
						{FormatTimetoHours(users[0].time)}
					</span>
				</div>
			</Link>
		</div>
		<div className={classes.thirdRank}>
			<div>
				<Image height={40} width={40} src={third} />
			</div>
			<Link href={`/users/${users[2]._id}`}>
				<div>
					<div>
						<Image height={60} width={60} src={users[2].image} />
					</div>
					<span className={classes.name3}>{users[2].username}</span>
					<span className={classes.session}>
						{FormatTimetoHours(users[2].time)}
					</span>
				</div>
			</Link>
		</div>
	</div>
)

export default Podium
