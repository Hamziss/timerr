import { useSession } from "next-auth/react"
import useStore from "../../zustand/store"
import NotFoundPage from "../404"

const Dashboard = () => {
	const { status } = useSession()
	const { userState } = useStore()
	if (status === "authenticated") {
		return (
			<div>
				this is still in production :3
				<p> meanwhile you have : {userState.datauser.coins} coins</p>
				<p>and you did {userState.datauser.sessions} sessions</p>
			</div>
		)
	}
	return <NotFoundPage />
}

export default Dashboard
