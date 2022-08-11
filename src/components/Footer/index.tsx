import Image from "next/image"
import contactUs from "../../../public/images/contactUs.png"
import classes from "./style.module.css"

const Footer = () => (
	<footer className={classes.footer}>
		<div className={classes.upperDiv}>
			<span>Want to Contribute in timerr ?</span>
			<button type="submit">
				<span>
					<a href="mailto:hamzachebbah9999@gmail.com"> Contact us </a>
				</span>
				<Image height={20} width={20} src={contactUs} />
			</button>
		</div>
		<div>
			<span>© 2022 | All Rights Reserved</span>
		</div>
	</footer>
)

export default Footer
