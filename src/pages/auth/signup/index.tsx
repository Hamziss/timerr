/* eslint-disable import/no-named-as-default */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { ErrorMessage, Field, Formik } from "formik"
import { toast } from "react-toastify"
import * as Yup from "yup"
import postData from "../../../services/fetchData/postData"

export default function SignIn() {
	return (
		<Formik
			initialValues={{ firstName: "", email: "", password: "", lastName: "" }}
			validationSchema={Yup.object({
				firstName: Yup.string()
					.max(30, "Must be 30 characters or less")
					.required("Please enter your first name"),
				email: Yup.string()
					.max(30, "Must be 30 characters or less")
					.email("Invalid email address")
					.required("Please enter your email"),
				password: Yup.string().required("Please enter your password"),
				lastName: Yup.string()
					.max(20, "Must be 20 characters or less")
					.required("Please enter your Last Name "),
			})}
			onSubmit={async (values, { setSubmitting }) => {
				const userData = {
					email: values.email,
					password: values.password,
					lastName: values.lastName,
					firstName: values.firstName,
				}
				const res = await postData("/users", userData)

				if (res?.error) {
					toast.error(res.error)
				} else {
					toast.success(res.msg)
				}
				setSubmitting(false)
			}}
		>
			{formik => (
				<form onSubmit={formik.handleSubmit}>
					<div className="bg-red-400">
						<div className="bg-white">
							<div className="mb-6">
								<label htmlFor="firstName" className="bold">
									First Name
									<Field
										name="firstName"
										aria-label="enter your first Name"
										aria-required="true"
										type="text"
										className="line"
									/>
								</label>

								<div className="text-red-600 text-sm">
									<ErrorMessage name="firstName" />
								</div>
							</div>
							<div className="mb-6">
								<label htmlFor="lastName" className="font-bold">
									Last Name
									<Field
										name="lastName"
										aria-label="enter your last Name"
										aria-required="true"
										type="text"
										className="w-f "
									/>
								</label>

								<div className="texm">
									<ErrorMessage name="lastName" />
								</div>
							</div>
							<div className="mb-4">
								<label htmlFor="email" className="uppe font-bold">
									Email
									<Field
										name="email"
										aria-label="enter your email"
										aria-required="true"
										type="text"
										className="w-fu"
									/>
								</label>

								<div className="sm">
									<ErrorMessage name="email" />
								</div>
							</div>

							<div className="mb-6">
								<label htmlFor="password" className="up">
									Password
									<Field
										name="password"
										aria-label="enter your password"
										aria-required="true"
										type="password"
									/>
								</label>

								<div className="text-red-600 text-sm">
									<ErrorMessage name="password" />
								</div>
							</div>
							<div className="justify-center">
								<button type="submit" className="150">
									{formik.isSubmitting ? "Please wait..." : "Sign Up"}
								</button>
							</div>
						</div>
					</div>
				</form>
			)}
		</Formik>
	)
}
