import { fetchSongToStore } from "$lib/api/Song";

/** @type {import('./$types').PageLoad} */
export async function load({ params, url }: { params: any; url: any }) {
    await fetchSongToStore(params.identifier);
}
