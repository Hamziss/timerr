import { useSession } from "next-auth/react"

type Props = {}

const Garden = (props: Props) => {
	const { data: token, status } = useSession()
	console.log(token)
	return <div>Garden</div>
}

export default Garden
