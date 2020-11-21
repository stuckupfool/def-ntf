import React from "react";
import "./Home.scss";

const Home = () => {
	return (
		<div>
			<div className="section">
				<div className="container has-text-centered">
					<h1 className="title">
						Welcome to the quintessential home of Rick and Morty information
					</h1>
					<h1 className="subtitle">
						as long as that information is limited to episodes and characters of the
						show
					</h1>
					<div className="level">
						<div className="level-item">
							<div style={{ position: "relative", width: "100%" }}>
								<div className="portal-abs">
									<div className="portal-layer-cnt">
										<img
											src="portal.png"
                                            className="portal-layer"
                                            alt="swirling portal"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Home;
