import { useSession } from "next-auth/react"

const Garden = () => {
	const { data: token } = useSession()
	console.log(token)
	return <div>Garden</div>
}

export default Garden
