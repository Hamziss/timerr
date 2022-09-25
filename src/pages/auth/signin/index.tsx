/* eslint-disable jsx-a11y/label-has-associated-control */
import { ErrorMessage, Field, Formik } from "formik"
import { signIn, SignInResponse } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { toast } from "react-toastify"
import * as Yup from "yup"
import logo from "../../../../public/images/logo.png"
import Signin from "../../../../public/images/Signin.png"
import classes from "./style.module.css"

export default function SignIn() {
	const router = useRouter()
	const [Error, setError] = useState<string | null>(null)

	return (
		<div className={classes.signinContainer}>
			<div className={classes.formWrapper}>
				<Link href="/">
					<div className={classes.logo}>
						<Image width={50} height={35} src={logo} />
					</div>
				</Link>
				<h1>Sign in</h1>
				<p>Enter your credentials to access your account </p>
				<button
					type="submit"
					className={classes.githubBtn}
					onClick={() =>
						signIn("github", {
							redirect: false,
							callbackUrl: `${window.location.origin}`,
						})
					}
				>
					sign in with github
				</button>

				<button
					type="submit"
					className={classes.googleBtn}
					onClick={() =>
						signIn("google", {
							redirect: false,
							callbackUrl: `${window.location.origin}`,
						})
					}
				>
					<Image width={20} height={20} src="/images/google.png" />
					Sign in with Google
				</button>
				<div className={classes.separator}>
					<div className={classes.firsthalf} />
					OR
					<div className={classes.secondhalf} />
				</div>
				<Formik
					initialValues={{ email: "", password: "" }}
					validationSchema={Yup.object({
						email: Yup.string()
							.max(30, "Must be 30 characters or less")
							.email("Invalid email address")
							.required("Please enter your email"),
						password: Yup.string().required("Please enter your password"),
					})}
					onSubmit={async (values, { setSubmitting }) => {
						const res: any = (await signIn("credentials", {
							redirect: false,
							email: values.email,
							password: values.password,

							callbackUrl: `${window.location.origin}`,
						})) as SignInResponse

						if (res?.error) {
							setError(res.error)
						} else {
							toast.success("Successfully signed in")
						}
						if (res.url) router.push(res.url)
						setSubmitting(false)
					}}
				>
					{formik => (
						<form onSubmit={formik.handleSubmit}>
							<div className="bg-white">
								{/* <button className={classes.google} type="submit">
									<Image height={25} width={25} src={google} />
									Sign in with Google
								</button>

								<div className={classes.separator}>
									<div />
									or
									<div />
								</div> */}
								<div className={classes.boxInput}>
									<label htmlFor="email" className="upold">
										Email
										<Field
											name="email"
											aria-label="enter your email"
											aria-required="true"
											type="text"
											className={classes.input}
										/>
									</label>

									<div className={classes.errorText}>
										<ErrorMessage name="email" />
									</div>
								</div>
								<div className={classes.boxInput}>
									<label htmlFor="password" className="upfont-bold">
										password
										<Field
											name="password"
											aria-label="enter your password"
											aria-required="true"
											type="password"
											className={classes.input}
										/>
									</label>

									<div className={classes.errorText}>
										<ErrorMessage name="password" />
									</div>
								</div>
								<span className={classes.errorText}>{Error}</span>
								<button type="submit" className={classes.btnSubmit}>
									{formik.isSubmitting ? "Please wait..." : "Sign In"}
								</button>
							</div>
						</form>
					)}
				</Formik>
				<p className={classes.newMember}>
					Not a member?
					<Link href="/auth/signup">
						<span className={classes.signup}> Sign up</span>
					</Link>
				</p>
			</div>
			<div className={classes.bgWave}>
				<Image objectFit="contain" src={Signin} />
			</div>
		</div>
	)
}

// This is the recommended way for Next.js 9.3 or newer
