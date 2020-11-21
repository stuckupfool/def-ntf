import { observer } from "mobx-react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../stores/UserStore";
import "./NavBar.scss";

const NavBar = observer(() => {
	const userStore = useContext(UserContext);
	return (
		<>
			<nav
				className="navbar nav-main"
				role="navigation"
				aria-label="main navigation"
			>
				<div className="container">
					<div className="navbar-brand">
						<Link to="/" className="navbar-item home-item">
							<img
								src="house_min.png"
								className="home-btn"
								alt="navigate to home"
								title="home"
							></img>
						</Link>
						<a
							role="button"
							className="navbar-burger burger"
							aria-label="menu"
							aria-expanded="false"
							data-target="navBarMain"
						>
							<span aria-hidden="true"></span>
							<span aria-hidden="true"></span>
							<span aria-hidden="true"></span>
						</a>
					</div>
					<div id="navBarMain" className="navbar-menu">
							<div className="navbar-start">
								<Link to="/episodes" className="navbar-item page-item">
									<h1 className="subtitle is-3">Episodes</h1>
								</Link>
								<div className="navbar-item">
									<h1 className="subtitle is-3">I</h1>
								</div>
								<Link to="/characters" className="navbar-item page-item">
									<h1 className="subtitle is-3">Characters</h1>
								</Link>
							</div>
							<div className="navbar-end">
								<div className="navbar-item">
									{userStore.isRegistered ? (
										userStore.email
									) : (
										<Link to="/register">
											<h1 className="subtitle is-4">Register</h1>
										</Link>
									)}
								</div>
							</div>
						</div>
				</div>
			</nav>
			<hr />
		</>
	);
});

export default NavBar;
