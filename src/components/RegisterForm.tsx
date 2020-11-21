import _ from "lodash";
import React, { useCallback, useContext, useState } from "react";
import { UserContext } from "../stores/UserStore";
import cx from "classnames";
import { useHistory } from "react-router-dom";

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

interface ValidationState {
	message?: string;
	isValid: boolean;
}

interface ValidationCache {
	name?: ValidationState;
	email?: ValidationState;
	password?: ValidationState;
}

const RegisterForm = () => {
	const userStore = useContext(UserContext);
	const history = useHistory();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [validationCache, setValidationCache] = useState<ValidationCache>({});

	const handleSubmit = useCallback(
		(name, email, password) => {
			const validationState: ValidationCache = {
				name: validateName(name),
				email: validateEmail(email),
				password: validatePassword(password),
			};

			setValidationCache(validationState);

			const allValid = _.chain(validationState)
				.flatMap((valState) => valState?.isValid)
				.every(Boolean)
				.value();

			if (allValid === true) {
				userStore.registerUser(name, email);
				history.push("/");
			}
		},
		[userStore,history]
	);

	return (
		<>
			<div className="section" style={{ paddingTop: "24px" }}>
				<h1 className="title">Join the Club!</h1>
				<h1 className="subtitle">
					Registering comes with a ton of additional benefits like a smug sense
					of superiority.
				</h1>
				<h1 className="subtitle">
					We promise that your personal data will be treated with the upmost
					privacy, it will go nowhere and we certainly won't use it to buy
					embarassing items off the internet and send them to your home.
				</h1>
				<div className="columns">
					<div
						className="column"
						style={{ paddingLeft: "164px", paddingRight: "164px" }}
					>
						<div className="section">
							<div className="container">
								<div className="box">
									<div className="field">
										<label className="label">Name</label>
										<div className="control">
											<input
												className={cx("input", {
													"is-danger":
														validationCache.name &&
														!validationCache.name.isValid,
												})}
												type="text"
												placeholder="Your Name"
												value={name}
												onChange={(evt) => setName(evt.target.value)}
											/>
											{validationCache.name &&
												!validationCache.name.isValid && (
													<p className="has-text-danger">
														{validationCache.name.message}
													</p>
												)}
										</div>
									</div>
									<div className="field">
										<label className="label">Email</label>
										<div className="control">
											<input
												className={cx("input", {
													"is-danger":
														validationCache.email &&
														!validationCache.email.isValid,
												})}
												type="text"
												placeholder="Your Email"
												value={email}
												onChange={(evt) => setEmail(evt.target.value)}
											/>
											{validationCache.email &&
												!validationCache.email.isValid && (
													<p className="has-text-danger">
														{validationCache.email.message}
													</p>
												)}
										</div>
									</div>
									<div className="field">
										<label className="label">Password</label>
										<div className="control">
											<input
												className={cx("input", {
													"is-danger":
														validationCache.password &&
														!validationCache.password.isValid,
												})}
												type="password"
												placeholder="Password"
												value={password}
												onChange={(evt) => setPassword(evt.target.value)}
											/>
											{validationCache.password &&
												!validationCache.password.isValid && (
													<p className="has-text-danger">
														{validationCache.password.message}
													</p>
												)}
										</div>
									</div>
									<div className="field is-grouped">
										<div className="control">
											<button
												onClick={() => handleSubmit(name, email, password)}
												className="button is-success"
											>
												Register
											</button>
										</div>
										<div className="control">
											<button
												className="button is-danger"
												onClick={() => {
													setName("");
													setEmail("");
													setPassword("");
												}}
											>
												Clear
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default RegisterForm;

const validateName = (name: string): ValidationState => {
	name = _.trim(name);
	const valid: ValidationState = { isValid: true };
	if (_.isEmpty(name)) {
		valid.isValid = false;
		valid.message = "you must enter your name";
	}
	return valid;
};
const validateEmail = (email: string): ValidationState => {
	email = _.trim(email);
	const valid: ValidationState = { isValid: true };
	if (_.isEmpty(email)) {
		valid.isValid = false;
		valid.message = "you must enter your email";
	} else if (!emailRegex.test(email)) {
		valid.isValid = false;
		valid.message = "this is not a valid email address";
	}
	return valid;
};
const validatePassword = (password: string): ValidationState => {
	password = _.trim(password);
	const valid: ValidationState = { isValid: true };
	if (_.isEmpty(password)) {
		valid.isValid = false;
		valid.message = "you must enter a password";
	} else if (password.length < 8) {
		valid.isValid = false;
		valid.message = "password must be atleast 8 characters long";
	}
	return valid;
};
