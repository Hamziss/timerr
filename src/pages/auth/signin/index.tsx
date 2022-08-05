/* eslint-disable jsx-a11y/label-has-associated-control */
import { ErrorMessage, Field, Formik } from "formik"
import { signIn, SignInResponse } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import * as Yup from "yup"
import classes from "./style.module.css"

export default function SignIn() {
	const router = useRouter()

	return (
		<div className={classes.signinContainer}>
			<div className={classes.formWrapper}>
				<h1>Sign in</h1>
				<p>Enter your credentials to access your account </p>
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
							// setError(res.error)
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
								<button type="submit">Sign in with Google</button>
								<div className={classes.separator}>
									<div />
									or
									<div />
								</div>
								<div className="mb-4">
									<label htmlFor="email" className="upold">
										Email
										<Field
											name="email"
											aria-label="enter your email"
											aria-required="true"
											type="text"
											className="w-full "
										/>
									</label>

									<div className="text-sm">
										<ErrorMessage name="email" />
									</div>
								</div>
								<div className="mb-6">
									<label htmlFor="password" className="upfont-bold">
										password
										<Field
											name="password"
											aria-label="enter your password"
											aria-required="true"
											type="password"
											className="w-fne"
										/>
									</label>

									<div className="textt-sm">
										<ErrorMessage name="password" />
									</div>
								</div>

								<button type="submit" className={classes.btnSubmit}>
									{formik.isSubmitting ? "Please wait..." : "Sign In"}
								</button>
							</div>
						</form>
					)}
				</Formik>
				<p className={classes.newMember}>
					Not a member?<Link href="/auth/signup">Sign up</Link>
				</p>
			</div>
			<div className={classes.bgWave} />
		</div>
	)
}

// This is the recommended way for Next.js 9.3 or newer
