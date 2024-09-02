import { fetchGenresToStore } from "$lib/api/Genre";
import { DisplayNameAsc } from "../../domain/Sorting";

/** @type {import('./$types').PageLoad} */
export async function load({ url }) {
    let sortOrder = url.searchParams.get("sort-order") ?? DisplayNameAsc;
    await fetchGenresToStore(sortOrder);
}
