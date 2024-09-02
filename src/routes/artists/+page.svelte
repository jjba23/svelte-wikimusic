<script lang="ts">
    import ArtistHomePageCard from "$lib/components/artist/ArtistHomePageCard.svelte";
    import { artistsHomePageItems } from "$lib/stores/artists";
    import { fetchArtistsToStore, searchArtistsToStore } from "$lib/api/Artist";

    import SortOrderSelect from "$lib/components/shared/SortOrderSelect.svelte";
    import { page } from "$app/stores";
    import { t } from "$lib/i18n/translation";
    import {
        CreatedAtAsc,
        CreatedAtDesc,
        DisplayNameAsc,
        DisplayNameDesc,
    } from "../../domain/Sorting";
    import SearchBar from "$lib/components/SearchBar.svelte";
    import { fade, blur, fly, slide, scale } from "svelte/transition";
    import { quintOut } from "svelte/easing";

    let sortOrderChoices: Map<string, string> = new Map(
        Object.entries({
            display_name_asc: "/artists?sort-order=" + DisplayNameAsc,
            display_name_desc: "/artists?sort-order=" + DisplayNameDesc,
            created_at_desc: "/artists?sort-order=" + CreatedAtDesc,
            created_at_asc: "/artists?sort-order=" + CreatedAtAsc,
        })
    );

    const doSearch = async function (searchVal: string) {
        let sortOrder =
            $page.url.searchParams.get("sort-order") ?? DisplayNameAsc;
        await searchArtistsToStore(sortOrder, searchVal);
    };

    const clearSearch = async function () {
        let sortOrder =
            $page.url.searchParams.get("sort-order") ?? DisplayNameAsc;
        await fetchArtistsToStore(sortOrder);
    };
</script>

<svelte:head>
    <title>{$t("i18n.artists")}&nbsp;{$t("i18n.onWikiMusic")}</title>
</svelte:head>

<div>
    <div class="flex justify-center items-center">
        <h3 class="h4">{$t("i18n.findArtistsSlogan")}</h3>

        <SortOrderSelect {sortOrderChoices} />
    </div>
    <SearchBar {doSearch} {clearSearch} />

    {#if $artistsHomePageItems}
        <section
            class="mt-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
            {#each $artistsHomePageItems as artist}
                <ArtistHomePageCard {artist} />
            {/each}
        </section>
    {:else}
        <p>So empty here...</p>
    {/if}
</div>
