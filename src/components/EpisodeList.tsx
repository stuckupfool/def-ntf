import { observer } from "mobx-react";
import React, { useCallback, useContext, useEffect, useRef } from "react";
import { EpisodeContext } from "./../stores/EpisodeStore";
import * as _ from "lodash";
import EpisodeCard from "./EpisodeCard";

const EpisodeList = observer(() => {
	const episodeStore = useContext(EpisodeContext);
	const loadingRef = useRef<HTMLDivElement>(null);

	const scrollObserver = useCallback(
		(node) => {
			new IntersectionObserver((entries) => {
				_.forEach(entries, (en) => {
					if (en.intersectionRatio > 0) {
						//load the next chunk
						episodeStore.loadNext();
					}
				});
			}, {
				root: null,
				rootMargin: "0px",
				threshold: 1.0,
			}).observe(node);
		},
		[episodeStore]
	);

	useEffect(() => {
		if (loadingRef.current) {
			scrollObserver(loadingRef.current);
		}
	}, [loadingRef, scrollObserver]);

	let firstColumn = [],
		secondColumn = [];
	for (let i = 0; i < episodeStore.episodes.length; i++) {
		if (i % 2 === 1) {
			secondColumn.push(episodeStore.episodes[i]);
		} else {
			firstColumn.push(episodeStore.episodes[i]);
		}
	}

	return (
		<>
			<div className="section" style={{ paddingTop: "24px" }}>
				<h1 className="title">Episodes</h1>
				<div className="columns">
					<div className="column">
						{_.map(firstColumn, (ep) => (
							<EpisodeCard episode={ep} key={ep.id} />
						))}
					</div>
					<div className="column">
						{_.map(secondColumn, (ep) => (
							<EpisodeCard episode={ep} key={ep.id} />
						))}
					</div>
				</div>
				<div ref={loadingRef}>
					{episodeStore.moreToLoad && (
						<div className="level">
							<div
								className="level-item has-text-centered"
								style={{ padding: "24px 30%" }}
							>
								<progress className="progress is-primary"></progress>
							</div>
						</div>
					)}
					{!episodeStore.moreToLoad && (
						<>
							<div className="block"></div>
							<div className="level">
								<div className="level-item">
									<div className="card">
										<div
											className="card-content"
											style={{ paddingLeft: "48px", paddingRight: "48px" }}
										>
											<button
												className="button is-primary"
												onClick={() =>
													window.scrollTo({ top: 0, behavior: "smooth" })
												}
											>
												Return to Top
											</button>
										</div>
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
});
export default EpisodeList;
