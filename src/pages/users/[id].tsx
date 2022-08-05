import { GetServerSideProps } from "next"
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

export const getServerSideProps: GetServerSideProps = async context => {
	const { id } = context.params as IParams

	const user: any = await getData(`users/${id}`)

	return {
		props: { user },
	}
}
