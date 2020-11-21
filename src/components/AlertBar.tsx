import { observer } from "mobx-react";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../stores/UserStore";
import "./AlertBar.scss";

const AlertBar = observer(() => {
	const userStore = useContext(UserContext);

	useEffect(() => {
		if (userStore.showAlert) {
			setTimeout(() => userStore.dismissAlert(), 8000);
		}
	});

	return (
		<>
			<nav
				className="navbar is-transparent is-fixed-bottom"
				style={{ backgroundColor: "transparent" }}
			>
				<div className="navbar-menu">
					<div className="navbar-start"></div>
					<div className="navbar-end">
						<div className="level-item">
							{userStore.showAlert === true && (
								<div className="message-cnt" style={{ paddingRight: "24px", paddingBottom: "8px" }}>
									<article className="message is-success is-medium">
										<div className="message-header">
											{userStore.name} has signed up!
											<button
												className="delete is-medium"
												onClick={() => userStore.dismissAlert()}
											></button>
										</div>
										<div className="message-body">
											<strong>Welcome to the club, {userStore.name}.</strong><br />
											Enjoy the
											<span className="redacted">spaghettios</span> we just
											mailed to your parent's house.
										</div>
									</article>
								</div>
							)}
						</div>
					</div>
				</div>
			</nav>
		</>
	);
});
export default AlertBar;
