import { fetchGenreToStore } from "$lib/api/Genre";

/** @type {import('./$types').PageLoad} */
export async function load({ params, url }: { params: any; url: any }) {
    await fetchGenreToStore(params.identifier);
}
