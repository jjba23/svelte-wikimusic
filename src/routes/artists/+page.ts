import { fetchArtistsToStore } from "$lib/api/Artist";
import { DisplayNameAsc } from "../../domain/Sorting";

/** @type {import('./$types').PageLoad} */
export async function load({ url }: { url: any }) {
    let sortOrder = url.searchParams.get("sort-order") ?? DisplayNameAsc;
    await fetchArtistsToStore(sortOrder);
}
