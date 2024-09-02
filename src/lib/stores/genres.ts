import { writable, type Writable } from "svelte/store";
import type { Genre } from "../../domain/Genre";

export const genresHomePageItems: Writable<Genre[]> = writable([]);

export const activeGenrePage: Writable<Genre | undefined> = writable(undefined);
