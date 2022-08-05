/* eslint-disable no-console */
import type { NextPage } from "next"
import Timer from "../components/Timer"
import classes from "../styles/Home.module.css"

const Home: NextPage = () => (
	// state
	// const { getUser, logout, userState, updateUser, timerState } = useStore()
	// const { settings } = timerState
	// const { datauser } = userState
	// const { data: session, status } = useSession()
	// const [mode, setmode] = useState("POMODORO")
	// const [timer, setTimer] = useState(settings.timepomodoro)
	// const [pomodoroCount, setPomodoroCount] = useState(0)

	<main>
		<div className={classes.bgHero} />
		<section className={classes.heroSection}>
			<Timer />
		</section>
	</main>
)

export default Home
