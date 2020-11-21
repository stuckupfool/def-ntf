import _ from "lodash";
import { observer } from "mobx-react";
import React, { useCallback, useContext, useState } from "react";
import CharacterStore, { CharacterContext } from "../stores/CharacterStore";

import { EpisodeResultItem } from "../stores/EpisodeStore";

const determineLoadGroup = (
	characterIdsInThisEpisode: string[],
	characterStore: CharacterStore
) => {
	const charactersInThisEpisode = _.map(characterIdsInThisEpisode, (id) => ({
		id: id,
		character: characterStore.characters.get(id),
	}));

	const characterIdsToLoad = _.chain(charactersInThisEpisode)
		.filter((pair) => pair.character === undefined)
		.map((pair) => pair.id)
		.value();
	return characterIdsToLoad;
};

const EpisodeCard = observer(({ episode }: { episode: EpisodeResultItem }) => {
	const characterStore = useContext(CharacterContext);
	const characterIdsInThisEpisode = _.map(episode.characters, (char) =>
		_.chain(char).split("/").last().value()
	);

	const [isExpanded, setIsExpanded] = useState(false);
	const expansionToggler = useCallback(() => {
		characterStore.loadRange(
			determineLoadGroup(characterIdsInThisEpisode, characterStore)
		);
		setIsExpanded(!isExpanded);
	}, [isExpanded, setIsExpanded,characterIdsInThisEpisode,characterStore]);
	return (
		<div className="char_cnt">
			<div className="card">
				<div className="card-content">
					<div className="level">
						<div className="level-left">
							<div className="level-item">
								<div className="media">
									<div className="media-content">
										<p className="title is-4">{episode.name}</p>
										<p className="subtitle is-6">{episode.air_date}</p>
									</div>
								</div>
							</div>
						</div>
						<div className="level-right">
							<div className="level-item">
								<button
									className="button is-small is-rounded is-primary is-normal"
									onClick={() => expansionToggler()}
								>
									{!isExpanded ? (
										<span>More Information...</span>
									) : (
										<span>Less Information...</span>
									)}
								</button>
							</div>
						</div>
					</div>
					{isExpanded && (
						<div>
							<div className="field">
								<label className="label">Episode</label>
								<div className="control">
									{episode.episode}
								</div>
							</div>
							<div className="field">
								<label className="label">Characters</label>
								<div className="control">
									<ul>
										{_.chain(characterIdsInThisEpisode)
											.map(
												(charId) =>
													characterStore.characters.get(charId)
											)
											.filter((char) => char !== undefined)
											.map((character) => <li key={character!.id}>{character!.name}</li>)
											.value()}
									</ul>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
});
export default EpisodeCard;
