import { useSession } from "next-auth/react"
import NotFoundPage from "../404"

const Dashboard = () => {
	const { status } = useSession()
	if (status === "authenticated") {
		return <div>Dashboard</div>
	}
	return <NotFoundPage />
}

export default Dashboard
