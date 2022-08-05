import { useSession } from "next-auth/react"
import NotFoundPage from "../404"

const Profile = () => {
	const { status } = useSession()
	if (status === "authenticated") {
		return <div>Profile</div>
	}
	return <NotFoundPage />
}

export default Profile
