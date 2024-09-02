<script lang="ts">
    import GenreHomePageCard from "$lib/components/genres/GenreHomePageCard.svelte";
    import { genresHomePageItems } from "$lib/stores/genres";
    import SortOrderSelect from "$lib/components/shared/SortOrderSelect.svelte";
    import { t } from "$lib/i18n/translation";
    import { page } from "$app/stores";
    import {
        CreatedAtAsc,
        CreatedAtDesc,
        DisplayNameAsc,
        DisplayNameDesc,
    } from "../../domain/Sorting";
    import { fetchGenresToStore, searchGenresToStore } from "$lib/api/Genre";
    import SearchBar from "$lib/components/SearchBar.svelte";

    let sortOrderChoices: Map<string, string> = new Map(
        Object.entries({
            display_name_asc: "/genres?sort-order=" + DisplayNameAsc,
            display_name_desc: "/genres?sort-order=" + DisplayNameDesc,
            created_at_desc: "/genres?sort-order=" + CreatedAtDesc,
            created_at_asc: "/genres?sort-order=" + CreatedAtAsc,
        })
    );
    const doSearch = async function (searchVal: string) {
        let sortOrder =
            $page.url.searchParams.get("sort-order") ?? DisplayNameAsc;
        await searchGenresToStore(sortOrder, searchVal);
    };

    const clearSearch = async function () {
        let sortOrder =
            $page.url.searchParams.get("sort-order") ?? DisplayNameAsc;
        await fetchGenresToStore(sortOrder);
    };
</script>

<svelte:head>
    <title>{$t("i18n.genres")}&nbsp;{$t("i18n.onWikiMusic")}</title>
</svelte:head>

<div>
    <div class="flex justify-center items-center">
        <h3 class="h4">{$t("i18n.findGenresSlogan")}</h3>

        <SortOrderSelect {sortOrderChoices} />
    </div>
    <SearchBar {doSearch} {clearSearch} />

    {#if $genresHomePageItems}
        <section
            class="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
            {#each $genresHomePageItems as genre}
                <GenreHomePageCard {genre} />
            {/each}
        </section>
    {:else}
        <p>So empty here...</p>
    {/if}
</div>
