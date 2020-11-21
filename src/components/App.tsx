import React from "react";
import CharacterStore, { CharacterContext } from "../stores/CharacterStore";
import EpisodeStore, { EpisodeContext } from "../stores/EpisodeStore";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import CharacterList from "./CharacterList";
import { ReactComponent as Logo } from "./logo.svg";
import Home from "./Home";
import EpisodeList from "./EpisodeList";
import UserStore, { UserContext } from "../stores/UserStore";
import RegisterForm from "./RegisterForm";
import AlertBar from "./AlertBar";

const characterStore = new CharacterStore();
const episodeStore = new EpisodeStore();
const userStore = new UserStore();

const App = () => {
	return (
		<div className="main-bgnd">
			<section className="hero hero-green">
				<div className="hero-body">
					<div className="container">
						<div className="level">
							<div className="level-item has-text-centered">
								<div>
									<Logo className="logo" />
									<h1 className="subtitle is-2 slogan">
										Forever and a Hundred Years
									</h1>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<UserContext.Provider value={userStore}>
				<NavBar />
			</UserContext.Provider>
			<div className="container">
				<CharacterContext.Provider value={characterStore}>
					<EpisodeContext.Provider value={episodeStore}>
						<Switch>
							<Route path="/characters">
								<CharacterList />
							</Route>
							<Route path="/episodes">
								<EpisodeList />
							</Route>
							<Route path="/register">
								<UserContext.Provider value={userStore}>
									<RegisterForm />
								</UserContext.Provider>
							</Route>
							<Route path="/">
								<Home />
							</Route>
						</Switch>
					</EpisodeContext.Provider>
				</CharacterContext.Provider>
			</div>
			<UserContext.Provider value={userStore}>
				<AlertBar />
			</UserContext.Provider>
		</div>
	);
};

export default App;
