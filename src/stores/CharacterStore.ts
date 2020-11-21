import {
	action,
	computed,
	makeObservable,
	observable,
	runInAction,
} from "mobx";
import React from "react";
import fetch from "../Util/Fetch";
import * as _ from "lodash";

export interface CharacterResultItem {
	id: string;
	name: string;
	status: "Alive" | "Dead" | "unknown";
	species: string;
	type: string;
	gender: string;
	origin: {
		name: string;
		url: string;
	};
	location: {
		name: string;
		url: string;
	};
	image: string;
	episode: string[];
	url: string;
	created: string;
}

export interface InfoResult {
	count: Number;
	pages: Number;
	next: string;
	prev: string;
}

interface CharacterResult {
	info: InfoResult;
	results: CharacterResultItem[];
}

class CharacterStore {
	public isLoading: boolean = false;

	public characters: Map<string, CharacterResultItem> = new Map();
	public get charactersOrderedById() {
		return _.chain([...this.characters.values()])
			.filter((val) => parseInt(val.id) <= this._endChunkId)
			.orderBy("id")
			.value();
	}

	private _nextPage?: string = "";
	private _endChunkId: number = 0;

	public totalCharacters: Number = 0;
	public get loadedCharacters() {
		return this.characters.size;
	}
	public get moreToLoad() {
		return this.loadedCharacters < this.totalCharacters;
	}

	constructor() {
		makeObservable(this, {
			characters: observable,
			charactersOrderedById: computed,
			totalCharacters: observable,
			loadedCharacters: computed,
			isLoading: observable,
			moreToLoad: computed,
		});

		this.loadNext();
	}

	@action public async loadRange(ids: string[]) {
		if (ids.length > 0) {
			const apiPath =
				"https://rickandmortyapi.com/api/character/" + ids.join(",");
			const results: CharacterResultItem[] = await fetch<CharacterResultItem[]>(
				apiPath,
				{}
			);

			runInAction(() => {
				_.forEach(results, (result) =>
					this.characters.set(result.id + "", result)
				);
			});
		}
	}

	@action public async loadNext() {
		if (this._nextPage !== null) {
			runInAction(() => {
				this.isLoading = true;
			});

			const nextPage =
				this._nextPage || "https://rickandmortyapi.com/api/character";

			const result: CharacterResult = await fetch<CharacterResult>(
				nextPage,
				{}
			);

			this._nextPage = result.info.next;

			runInAction(() => {
				_.forEach(result.results, (result) => {
					this._endChunkId = Math.max(this._endChunkId, parseInt(result.id));
					this.characters.set(result.id + "", result);
				});
				this.totalCharacters = result.info.count;
				this.isLoading = false;
			});
		}
	}
}
export const CharacterContext = React.createContext<CharacterStore>(
	new CharacterStore()
);
export default CharacterStore;
