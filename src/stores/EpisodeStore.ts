import _ from "lodash";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import React from "react";
import fetch from "../Util/Fetch";
import { InfoResult } from "./CharacterStore";

export interface EpisodeResultItem {
    id: string;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
    url: string;
    created: string;
}

interface EpisodeResult {
    info: InfoResult;
    results: EpisodeResultItem[];
}

class EpisodeStore {
    public isLoading: boolean = false;

	public episodes: EpisodeResultItem[] = [];
	public get episodesById() {
		return _.keyBy(this.episodes, "id");
	}

	private _nextPage?: string = "";

	public totalEpisodes: Number = 0;
	public get loadedEpisodes() {
		return this.episodes.length;
	}
	public get moreToLoad() { return this.loadedEpisodes < this.totalEpisodes; }

	constructor() {
		makeObservable(this, {
			episodes: observable,
			episodesById: computed,
			totalEpisodes: observable,
			loadedEpisodes: computed,
			isLoading: observable,
			moreToLoad: computed
		});
	}

	@action public async loadNext() {
		if (this._nextPage !== null) {
			runInAction(() => {
				this.isLoading = true;
			});

			const nextPage =
				this._nextPage || "https://rickandmortyapi.com/api/episode";

			const result: EpisodeResult = await fetch<EpisodeResult>(
				nextPage,
				{}
			);

			this._nextPage = result.info.next;

			runInAction(() => {
				this.episodes = _.concat(this.episodes, result.results);
				this.totalEpisodes = result.info.count;
				this.isLoading = false;
			});
		}
	}
}
export const EpisodeContext = React.createContext<EpisodeStore>(new EpisodeStore());
export default EpisodeStore;