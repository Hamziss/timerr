/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Avatar from "@mui/material/Avatar"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useClickOutside from "../../hooks/useClickOutside"

import GardenIcon from "../../../public/images/garden.png"
import Logo from "../../../public/images/logo.png"
import Logout from "../../../public/images/logout.png"
import Monitor from "../../../public/images/monitor.png"
import Polygon from "../../../public/images/Polygon.png"
import Ranking from "../../../public/images/ranking.png"
import UserIcon from "../../../public/images/user.png"
import useStore from "../../zustand/store"
import classes from "./style.module.css"

const Navbar = () => {
	const { getUser, logout, userState } = useStore()
	const { pathname } = useRouter()
	const { data: session, status } = useSession()
	const [isOpen, setIsOpen] = useState(false)
	const domNode = useClickOutside(() => {
		setIsOpen(false)
	})
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
			url: "profile",
			icon: <Image src={UserIcon} />,
		},

		{
			label: (
				// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
				<div
					onClick={() => {
						signOut()
						logout()
					}}
				>
					logout
				</div>
			),
			url: "",
			icon: <Image src={Logout} />,
		},
	]
	useEffect(() => {
		if (status === "authenticated") {
			getUser(session.user?._id!)
		}
	}, [userState, getUser, status, session?.user?._id])

	const pagesWithoutNavbar = ["/auth/signin", "/auth/signup"]

	const renderNavbar = !pagesWithoutNavbar.includes(pathname)

	return renderNavbar ? (
		<nav className={classes.navBarContainer}>
			<div className={classes.logoContainer}>
				<NextLink href="/">
					<a>
						<Image
							className={classes.logo}
							width={65}
							height={45}
							src={Logo}
							priority
						/>
					</a>
				</NextLink>
			</div>
			<div className={classes.midContainer}>
				<button type="submit">
					<NextLink href="/">Home</NextLink>
				</button>
				<button type="submit">
					<NextLink href="/store">Store</NextLink>
				</button>
				<button type="submit">
					<NextLink href="/about">About</NextLink>
				</button>
			</div>

			{status === "authenticated" ? (
				<>
					{" "}
					<div className={classes.rightContainer}>
						<Avatar
							alt="Remy Sharp"
							sx={{
								width: "30",
								height: "30",
								cursor: "pointer",
								marginRight: "20px",
							}}
							src={session.user.image}
							onClick={() => setIsOpen(!isOpen)}
						/>
					</div>
					{isOpen && (
						<>
							<div className={classes.PolygonContainer}>
								<Image src={Polygon} />
							</div>
							<div ref={domNode} className={classes.dropdown}>
								{DropdownItems.map((item, index) => (
									<button
										type="submit"
										key={index}
										onClick={() => setIsOpen(false)}
									>
										<NextLink href={`/${item.url}`}>
											<a className={classes.dropdownItem}>
												<div className={classes.imgContainer}>{item.icon}</div>
												<span>{item.label}</span>
											</a>
										</NextLink>
									</button>
								))}
							</div>
						</>
					)}
				</>
			) : (
				<div className={classes.rightContainer}>
					<NextLink href="/auth/signin">
						<a className={classes.signin}>sign in</a>
					</NextLink>
					<NextLink className={classes.signup} href="/auth/signup">
						<a className={classes.signup}> sign up</a>
					</NextLink>
				</div>
			)}
		</nav>
	) : null
}

export default Navbar
