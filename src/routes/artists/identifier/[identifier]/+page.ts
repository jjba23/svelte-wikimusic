import { fetchArtistToStore } from "$lib/api/Artist";

/** @type {import('./$types').PageLoad} */
export async function load({ params, url }: { params: any; url: any }) {
    await fetchArtistToStore(params.identifier);
}
