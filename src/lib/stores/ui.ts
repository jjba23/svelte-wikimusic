import { browser } from "$app/environment";
import { writable, type Writable } from "svelte/store";
import type { SystemInformation } from "../../domain/SystemInformation";

const lStored = browser && window ? window.localStorage.locale ?? "en" : "en";
export const locale = writable(lStored ?? "en");
locale.subscribe((value: string) => {
	try {
		if (window) {
			window.localStorage.locale = value;
		}
	} catch (e) {
		console.error(e);
	}
});

export const systemInformation: Writable<SystemInformation | undefined> = writable(undefined);
