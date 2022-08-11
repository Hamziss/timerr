import Image from "next/image"
import circle from "../../../public/images/About/circle.png"
import circle2 from "../../../public/images/About/circle2.png"
import circle3 from "../../../public/images/About/circle3.png"
import concept from "../../../public/images/About/concept.png"
import garden from "../../../public/images/About/garden.png"
import ranking from "../../../public/images/About/ranking.png"
import store from "../../../public/images/About/store.png"
import {
	ABOUT_CONCEPT,
	ABOUT_GARDEN,
	ABOUT_RANKING,
	ABOUT_STORE,
} from "../../../utils/constants"
import Footer from "../../components/Footer"
import classes from "../../styles/about.module.css"

const AboutPage = () => (
	<>
		<main className={classes.wrapper}>
			<div className={classes.titleContainer}>
				<h1>About Timerr</h1>
				{/* <Image src={} /> */}
			</div>
			<section className={classes.Concept}>
				<div className={classes.circleContainer}>
					<Image layout="responsive" src={circle} />
				</div>
				<div className={classes.textSide}>
					<h2>The Concept</h2>
					<p>{ABOUT_CONCEPT}</p>
				</div>
				<div className={classes.imgSide}>
					<Image objectFit="contain" layout="fill" src={concept} />
				</div>
			</section>
			<section className={classes.Store}>
				<div className={classes.circleContainer2}>
					<Image layout="responsive" src={circle2} />
				</div>
				<div className={classes.imgSide}>
					<Image objectFit="contain" layout="fill" src={store} />
				</div>

				<div className={classes.textSide}>
					<h2>The Store</h2>
					<p>{ABOUT_STORE}</p>
				</div>
			</section>
			<section className={classes.Garden}>
				<div className={classes.circleContainer}>
					<Image layout="responsive" src={circle3} />
				</div>
				<div className={classes.textSide}>
					<h2>The Garden</h2>
					<p>{ABOUT_GARDEN}</p>
				</div>
				<div className={classes.imgSide}>
					<Image objectFit="contain" layout="fill" src={garden} />
				</div>
			</section>{" "}
			<section className={classes.Ranking}>
				<div className={classes.imgSide}>
					<Image objectFit="contain" layout="fill" src={ranking} />
				</div>
				<div className={classes.textSide}>
					<h2>Ranking</h2>
					<p>{ABOUT_RANKING}</p>
				</div>{" "}
			</section>
		</main>
		<Footer />
	</>
)

export default AboutPage
