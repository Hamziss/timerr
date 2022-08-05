import Link from "next/link"
import getData from "../../services/fetchData/getData"
import { IUser } from "../../types/user"

type Props = {
	users: IUser[]
}
const Users = ({ users }: Props) => (
	<div>
		{users.map((user: IUser) => (
			<div key={user._id}>
				<Link href={`http://localhost:3000/users/${user._id}`} key={user._id}>
					{user.email}
				</Link>
			</div>
		))}
	</div>
)

export default Users

export async function getServerSideProps() {
	const res = await getData("/users")
	const { users } = res

	return {
		props: { users },
	}
}
