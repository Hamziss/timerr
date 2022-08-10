/* eslint-disable import/no-named-as-default */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { ErrorMessage, Field, Formik } from "formik"
import { signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "react-toastify"
import * as Yup from "yup"
import logo from "../../../../public/images/logo.png"
import Signin from "../../../../public/images/Signin.png"
import postData from "../../../services/fetchData/postData"
import classes from "./style.module.css"

export default function SignIn() {
	return (
		<div className={classes.signinContainer}>
			<div className={classes.formWrapper}>
				<Link href="/">
					<div className={classes.logo}>
						<Image width={50} height={35} src={logo} />
					</div>
				</Link>
				<h1>
					Welcome to <br /> Timerr!
				</h1>
				<p>Ready to be productive? </p>
				<Formik
					initialValues={{
						firstName: "",
						email: "",
						password: "",
						lastName: "",
						username: "",
						passwordConfirmation: "",
					}}
					validationSchema={Yup.object({
						firstName: Yup.string()
							.max(30, "Must be 30 characters or less")
							.required("Please enter your first name"),
						email: Yup.string()
							.max(30, "Must be 30 characters or less")
							.email("Invalid email address")
							.required("Please enter your email"),
						username: Yup.string()
							.max(30, "Must be 30 characters or less")
							.required("Please enter your username")
							.matches(
								/^[a-zA-Z0-9@]+$/,
								"This field cannot contain white space and special character"
							),
						password: Yup.string()
							.required("Please enter your password")
							.matches(
								/^[a-zA-Z0-9@]+$/,
								"This field cannot contain white space and special character"
							)
							.min(6, "Password Not Strong must be at least 6 characters long"),
						lastName: Yup.string()
							.max(20, "Must be 20 characters or less")
							.required("Please enter your Last Name "),
						passwordConfirmation: Yup.string().oneOf(
							[Yup.ref("password"), null],
							"Passwords must match"
						),
					})}
					onSubmit={async (values, { setSubmitting }) => {
						const userData = {
							email: values.email,
							password: values.password,
							lastName: values.lastName,
							firstName: values.firstName,
							username: values.username,
						}
						const res = await postData("/users", userData)

						if (res?.error) {
							toast.error(res.error)
						} else {
							await signIn("credentials", {
								redirect: true,
								email: values.email,
								password: values.password,
								callbackUrl: `${window.location.origin}`,
							})
						}
						setSubmitting(false)
					}}
				>
					{formik => (
						<form onSubmit={formik.handleSubmit}>
							<div className="bg-red-400">
								<div className="bg-white">
									<div className={classes.firstline}>
										<div className={classes.boxInput}>
											<label htmlFor="firstName" className="bold">
												First Name
												<Field
													name="firstName"
													aria-label="enter your first Name"
													aria-required="true"
													type="text"
													className={classes.input}
												/>
											</label>

											<div className={classes.errorText}>
												<ErrorMessage name="firstName" />
											</div>
										</div>
										<div className={classes.boxInput}>
											<label htmlFor="lastName" className="font-bold">
												Last Name
												<Field
													name="lastName"
													aria-label="enName"
													aria-required="true"
													type="text"
													className={classes.input}
												/>
											</label>

											<div className={classes.errorText}>
												<ErrorMessage name="lastName" />
											</div>
										</div>
									</div>
									<div className={classes.boxInput}>
										<label htmlFor="username" className="font-bold">
											Username
											<Field
												name="username"
												aria-label="enter your username"
												aria-required="true"
												type="text"
												className={classes.input}
											/>
										</label>

										<div className={classes.errorText}>
											<ErrorMessage name="username" />
										</div>
									</div>
									<div className={classes.boxInput}>
										<label htmlFor="email" className="uppe font-bold">
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
										<label htmlFor="password" className="up">
											Password
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
									<div className={classes.boxInput}>
										<label htmlFor="passwordConfirmation" className="up">
											Confirm Password
											<Field
												name="passwordConfirmation"
												aria-label="confirm your password"
												aria-required="true"
												type="password"
												className={classes.input}
											/>
										</label>

										<div className={classes.errorText}>
											<ErrorMessage name="passwordConfirmation" />
										</div>
									</div>
									<div className="justify-center">
										<button type="submit" className={classes.btnSubmit}>
											{formik.isSubmitting ? "Please wait..." : "Sign Up"}
										</button>
									</div>
								</div>
							</div>
						</form>
					)}
				</Formik>
				<p className={classes.newMember}>
					Already a member?
					<Link href="/auth/signin">
						<span className={classes.signup}> Sign in</span>
					</Link>
				</p>
			</div>
			<div className={classes.bgWave}>
				<Image objectFit="contain" src={Signin} />
			</div>
		</div>
	)
}
