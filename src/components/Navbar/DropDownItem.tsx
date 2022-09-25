import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/router"
import GardenIcon from "../../../public/images/garden.png"
import Logout from "../../../public/images/logout.png"
import Monitor from "../../../public/images/monitor.png"
import Ranking from "../../../public/images/ranking.png"
import UserIcon from "../../../public/images/user.png"
import useStore from "../../zustand/store"

const useDropDownItem = () => {
	const Router = useRouter()
	const { logout } = useStore()
	const { data: session } = useSession()

	const DropdownItems = [
		{
			label: "Dashboard",
			url: "dashboard",
			icon: <Image src={Monitor} />,
		},
		{
			label: "Garden",
			url: "garden",
			icon: <Image src={GardenIcon} />,
		},
		{
			label: "Ranking",
			url: "users",
			icon: <Image src={Ranking} />,
		},
		{
			label: "Profile",
			url: `users/${session?.user?.id}`,
			icon: <Image src={UserIcon} />,
		},
		{
			label: (
				// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
				<div
					onClick={async () => {
						logout()
						await signOut({ callbackUrl: "/" })
						Router.push("/")
					}}
				>
					logout
				</div>
			),
			url: "",
			icon: <Image src={Logout} />,
		},
	]

	return DropdownItems
}
export default useDropDownItem
