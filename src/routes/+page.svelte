<script lang="ts">
    import "../app.css";
    import SongHomePageCard from "$lib/components/song/SongHomePageCard.svelte";
    import SearchBar from "$lib/components/SearchBar.svelte";
    import { songsHomePageItems } from "$lib/stores/songs";
    import SortOrderSelect from "$lib/components/shared/SortOrderSelect.svelte";
    import { t } from "$lib/i18n/translation";
    import { fetchSongsToStore, searchSongsToStore } from "$lib/api/Song";
    import {
        CreatedAtAsc,
        CreatedAtDesc,
        DisplayNameAsc,
        DisplayNameDesc,
    } from "../domain/Sorting";
    import { page } from "$app/stores";

    let sortOrderChoices: Map<string, string> = new Map(
        Object.entries({
            display_name_asc: "/?sort-order=" + DisplayNameAsc,
            display_name_desc: "/?sort-order=" + DisplayNameDesc,
            created_at_desc: "/?sort-order=" + CreatedAtDesc,
            created_at_asc: "/?sort-order=" + CreatedAtAsc,
        })
    );

    const doSearch = async function (searchVal: string) {
        let sortOrder =
            $page.url.searchParams.get("sort-order") ?? DisplayNameAsc;
        await searchSongsToStore(sortOrder, searchVal);
    };

    const clearSearch = async function () {
        let sortOrder =
            $page.url.searchParams.get("sort-order") ?? DisplayNameAsc;
        await fetchSongsToStore(sortOrder);
    };
</script>

<svelte:head>
    <title>{$t("i18n.songs")}&nbsp;{$t("i18n.onWikiMusic")}</title>
</svelte:head>

<div>
    <div class="flex justify-center items-center">
        <h3 class="h4">{$t("i18n.findSongsSlogan")}</h3>
        <SortOrderSelect {sortOrderChoices} />
    </div>
    <SearchBar {doSearch} {clearSearch} />
    {#if $songsHomePageItems}
        <section
            class="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
            {#each $songsHomePageItems as song}
                <SongHomePageCard {song} />
            {/each}
        </section>
    {:else}
        <p>So empty here...</p>
    {/if}
</div>
