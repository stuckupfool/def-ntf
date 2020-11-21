import { observer } from "mobx-react";
import React, { useCallback, useState } from "react";
import { CharacterResultItem } from "../stores/CharacterStore";
import "./CharacterCard.scss";
import * as _ from "lodash";

const CharacterCard = observer(
	({ character }: { character: CharacterResultItem }) => {
		const [isExpanded, setIsExpanded] = useState(false);
		const expansionToggler = useCallback(() => setIsExpanded(!isExpanded), [
			isExpanded,
			setIsExpanded,
		]);
		return (
			<div className="char_cnt">
				<div className="card">
					<div className="card-content">
						<div className="level">
							<div className="level-left">
								<div className="level-item">
									<div className="media">
										<figure className="media-left">
											<p className="image is-64x64">
												<img
													src={character.image}
													alt={`portrait of ${character.name}`}
												/>
											</p>
										</figure>
										<div className="media-content">
											<p className="title is-4">{character.name} - {character.id}</p>
											<p className="subtitle is-6">{character.origin.name}</p>
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
								<div className="columns">
									<div className="column">
										<DetailLabelPair
											label="Species"
											value={character.species}
										/>
									</div>
									{character.type && (
										<div className="column">
											<DetailLabelPair label="Type" value={character.type} />
										</div>
									)}
									<div className="column">
										<DetailLabelPair label="Gender" value={character.gender} />
									</div>
									<div className="column">
										<DetailLabelPair
											label="Origin"
											value={character.origin.name}
										/>
									</div>
									<div className="column">
										<DetailLabelPair
											label="Location"
											value={character.location.name}
										/>
									</div>
								</div>
								<div className="field is-horizontal">
									<div className="field-label">Episodes:</div>
									<div className="field-body">
										<div className="tags">
										{_.map(character.episode, (ep) => 
											<span className="tag is-primary" key={ep}>
												{_.chain(ep).split("/").last().value()}
											</span>
										)}
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
);

export const DetailLabelPair = (props: { label: string; value: string }) => (
	<div className="field is-horizontal">
		<div className="field-label">
			<label className="label">{props.label}</label>
		</div>
		<div className="field-body">{props.value}</div>
	</div>
);
export default CharacterCard;
