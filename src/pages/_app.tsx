/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import Head from "next/head"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "swiper/css/bundle"
import Navbar from "../components/Navbar/Navbar"
import "../styles/globals.css"

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={session}>
			<Head>
				<title>My new cool app</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Navbar />
			<Component {...pageProps} />
			<ToastContainer
				position="top-right"
				autoClose={8000}
				hideProgressBar={false}
				newestOnTop={false}
				draggable={false}
				closeOnClick
				pauseOnHover
			/>
		</SessionProvider>
	)
}

export default MyApp
