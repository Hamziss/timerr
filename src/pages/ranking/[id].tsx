import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import getData from "../../services/fetchData/getData"
import { IUser } from "../../types/user"

type Props = {
	user: IUser
}
interface IParams extends ParsedUrlQuery {
	id: string
}

const UserPage = ({ user }: Props) => (
	<div>
		<p>{user._id}</p>
		<p>{user.email}</p>
	</div>
)

export default UserPage

export const getStaticPaths: GetStaticPaths = async () => {
	const res = await getData("/users")
	const { users } = res

	const paths = users.map((user: IUser) => ({
		params: { id: user._id.toString() },
	}))
	return {
		paths,
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps = async (context: any) => {
	const { id } = context.params as IParams

	const res: any = await getData(`/users/${id}`)

	const { user } = res

	return {
		props: { user },
	}
}
