import { fetchSongsToStore } from "$lib/api/Song";
import { DisplayNameAsc } from "../domain/Sorting";

/** @type {import('./$types').PageLoad} */
export async function load({ url }: { url: any }) {
    let sortOrder = url.searchParams.get("sort-order") ?? DisplayNameAsc;
    await fetchSongsToStore(sortOrder);
}
