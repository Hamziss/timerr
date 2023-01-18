/* eslint-disable no-console */
import type { GetServerSideProps, NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import arrowRight from "../../public/images/Home/arrowRight.png"
import cirle from "../../public/images/Home/circle.png"
import cirleBoy from "../../public/images/Home/circleBoy.png"
import cirleGirl from "../../public/images/Home/circleGirl.png"
import circleHero from "../../public/images/Home/circleHero.png"
import girlBubble1 from "../../public/images/Home/girlBubble1.png"
import girlBubble2 from "../../public/images/Home/girlBubble2.png"
import leftCorne from "../../public/images/Home/leftCorne.svg"
import rightCorne from "../../public/images/Home/rightCorne.png"
import Sinjab from "../../public/images/Home/sinjab.png"
import Sparkle from "../../public/images/Home/sparkle.png"
import Footer from "../components/Footer"
import Timer from "../components/Timer"
import classes from "../styles/Home.module.css"
import {
	FOURTH_BUBBLE_TEXT,
	SECOND_BUBBLE_TEXT,
	STORE_PARAGARAPH,
	THIRD_BUBBLE_TEXT,
	quotes,
} from "../utils/constants"
import { getRandomQuote } from "../utils/helpers"

interface Props {
	quote: {
		content: string
		author: string
	}
}
const Home: NextPage<Props> = ({ quote }) => (
	<main className={classes.main}>
		<div className={classes.bgHero} />
		<div className={classes.circleContainer}>
			<Image layout="responsive" src={circleHero} />
		</div>
		<section className={classes.heroSection}>
			<Timer />
		</section>
		<section className={classes.motivationSection}>
			<div className={classes.cirleBoyContainer}>
				<Image placeholder="blur" src={cirleBoy} />
			</div>
			<div className={classes.quoteContainer}>
				<div className={classes.sparkle}>
					<Image src={Sparkle} />
				</div>
				<div className={classes.quotetextContainer}>
					<span>&quot;{quote.content}&quot;</span> -<span>{quote.author}</span>
				</div>
				<div className={classes.sparkle}>
					<Image src={Sparkle} />
				</div>
			</div>
			<div className={classes.cirleGirlContainer}>
				<Image placeholder="blur" src={cirleGirl} />
			</div>
		</section>

		<section className={classes.aboutSection}>
			<div className={classes.firstBubble}>
				<div>
					<Image src={leftCorne} />
				</div>
				<div>What is timerr ?</div>
			</div>

			<div className={classes.rightBubble}>
				<div>{SECOND_BUBBLE_TEXT}</div>
				<div>
					<Image layout="fill" src={rightCorne} />
				</div>
			</div>
			<div className={classes.girlBubble1}>
				<Image layout="responsive" src={girlBubble1} />
			</div>
			<div className={classes.firstBubble}>
				<div>
					<Image src={leftCorne} />
				</div>
				<div>{THIRD_BUBBLE_TEXT}</div>
			</div>
			<div className={classes.rightBubble}>
				<div>{FOURTH_BUBBLE_TEXT}</div>
				<div>
					<Image layout="fill" src={rightCorne} />
				</div>
			</div>
			<div className={classes.girlBubble1}>
				<Image layout="responsive" src={girlBubble2} />
			</div>
		</section>
		<div className={classes.wavesOpacity} />
		<section className={classes.sectionStore}>
			<div className={classes.textContainer}>
				<div className="circleContainer">
					<Image layout="responsive" src={cirle} />
				</div>
				<h1>The Store</h1>
				<p>{STORE_PARAGARAPH}</p>
				<div>
					<Link href="/store">
						<button type="submit">
							<span>Go to Store</span>
							<Image height={10} width={20} src={arrowRight} />
						</button>
					</Link>
				</div>
			</div>
			<div className={classes.StoreImageContainer}>
				<Image src={Sinjab} />
			</div>
		</section>
		<Footer />
	</main>
)

export const getServerSideProps: GetServerSideProps = async () => {
	const quote = getRandomQuote(quotes)
	return {
		props: { quote },
	}
}

export default Home
