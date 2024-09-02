import { writable, type Writable } from "svelte/store";
import type { Song } from "../../domain/Song";

export const songsHomePageItems: Writable<Song[]> = writable([]);

export const activeSongPage: Writable<Song | undefined> = writable(undefined);
