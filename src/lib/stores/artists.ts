import { writable, type Writable } from "svelte/store";
import type { Artist } from "../../domain/Artist";

export const artistsHomePageItems: Writable<Artist[]> = writable([]);

export const activeArtistPage: Writable<Artist | undefined> =
    writable(undefined);
