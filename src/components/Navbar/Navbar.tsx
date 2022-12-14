/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Avatar from "@mui/material/Avatar"
import LinearProgress from "@mui/material/LinearProgress"
import { useSession } from "next-auth/react"
import Image from "next/image"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import about from "../../../public/images/about.png"
import home from "../../../public/images/home.png"
import Logo from "../../../public/images/logo.png"
import Polygon from "../../../public/images/Polygon.png"
import store from "../../../public/images/store.png"
import useClickOutside from "../../hooks/useClickOutside"
import useStore from "../../zustand/store"
import useDropDownItem from "./DropDownItem"
import classes from "./style.module.css"

const Navbar = () => {
	const { getUser, userState } = useStore()

	const { pathname } = useRouter()
	const { data: session, status } = useSession()
	const DropdownItems = useDropDownItem()
	const [isOpen, setIsOpen] = useState(false)
	const domNode = useClickOutside(() => {
		setIsOpen(false)
	})

	useEffect(() => {
		if (status === "authenticated") {
			getUser(session.user?.id!)
		}
	}, [userState, getUser, status, session?.user?.id])

	const pagesWithoutNavbar = ["/auth/signin", "/auth/signup"]

	const renderNavbar = !pagesWithoutNavbar.includes(pathname)
	if (status === "loading") {
		return <LinearProgress color="success" />
	}
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
					<NextLink href="/">
						<a>
							<span className={classes.desktop}> Home</span>
							<span className={classes.mobile}>
								<Image height={20} width={20} src={home} />
							</span>
						</a>
					</NextLink>
				</button>
				<button type="submit">
					<NextLink href="/store">
						<a>
							<span className={classes.desktop}> Store</span>
							<span className={classes.mobile}>
								<Image height={20} width={20} src={store} />
							</span>
						</a>
					</NextLink>
				</button>
				<button type="submit">
					<NextLink href="/about">
						<a>
							<span className={classes.desktop}> About</span>
							<span className={classes.mobile}>
								<Image height={20} width={20} src={about} />
							</span>
						</a>
					</NextLink>
				</button>
			</div>

			{status === "authenticated" ? (
				<>
					<div className={classes.rightContainer}>
						<span className={classes.username}>
							{userState.datauser?.username}
						</span>
						<Avatar
							alt="Remy Sharp"
							sx={{
								width: "30",
								height: "30",
								cursor: "pointer",
								marginRight: "20px",
							}}
							src={userState.datauser?.image}
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
