import { observer } from "mobx-react";
import React, { useCallback, useContext, useEffect, useRef } from "react";
import { CharacterContext } from "./../stores/CharacterStore";
import * as _ from "lodash";
import CharacterCard from "./CharacterCard";

const CharacterList = observer(() => {
	const characterStore = useContext(CharacterContext);
	const loadingRef = useRef<HTMLDivElement>(null);

	const scrollObserver = useCallback(
		(node) => {
			new IntersectionObserver(
				(entries) => {
					_.forEach(entries, (en) => {
						if (en.intersectionRatio > 0) {
							//load the next chunk
							characterStore.loadNext();
						}
					});
				},
				{
					root: null,
					rootMargin: "0px",
					threshold: 1.0,
				}
			).observe(node);
		},
		[characterStore]
	);

	useEffect(() => {
		if (loadingRef.current) {
			scrollObserver(loadingRef.current);
		}
	}, [loadingRef, scrollObserver]);

	return (
		<>
			<div className="section" style={{ paddingTop: "24px" }}>
				<h1 className="title">Characters</h1>
				{_.map(characterStore.charactersOrderedById, (char) => (
					<CharacterCard character={char} key={char.id} />
				))}
				{}
				<div ref={loadingRef}>
					{characterStore.moreToLoad && (
						<div className="level">
							<div
								className="level-item has-text-centered"
								style={{ padding: "24px 30%" }}
							>
								<progress className="progress is-primary"></progress>
							</div>
						</div>
					)}
					{!characterStore.moreToLoad && (
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
export default CharacterList;
