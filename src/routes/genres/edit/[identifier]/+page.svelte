<script lang="ts">
  import {
      handleCreateGenreArtworks,
      handleDeleteGenreArtwork,
      handleEditGenre
  } from "$lib/api/Genre";
  import FormSubmitterButton from "$lib/components/shared/buttons/FormSubmitterButton.svelte";
  import FormRequiredExplanation from "$lib/components/shared/forms/FormRequiredExplanation.svelte";
  import FormTitle from "$lib/components/shared/forms/FormTitle.svelte";
  import TextInput from "$lib/components/shared/forms/TextInput.svelte";
  import { activeGenrePage } from "$lib/stores/genres";

  import { goto } from "$app/navigation";

  import { handleGenrePositionChangeArtwork } from "$lib/api/Genre";
  import { sortArtworks } from "$lib/components/shared/CardCarousel";
  import { isNonEmptyString } from "$lib/forms/Util";
  import { get } from "svelte/store";
  import { toEuropeanTimestamp } from "../../../../domain/DateTime";
  import type { EditGenre, GenreArtwork, InsertGenreArtworksRequestItem, InsertGenreRequestItem } from "../../../../domain/Genre";

  const handleAddArtworkForm = async (e: Event) => {
    await handleCreateGenreArtworks({genreArtworks: [addArtwork]}, $activeGenrePage?.identifier);
  };

  const handleEditForm = async (e: Event) => {
    const editGenre: EditGenre = {identifier: $activeGenrePage?.identifier, ...genreDelta};
    await handleEditGenre({genreDeltas: [editGenre]}, editGenre.identifier);
  }
  

  const backAction = async () => {
    const genre = get(activeGenrePage);
    if (!genre) {
      goto("/", { replaceState: true });
    } else {
      goto("/genres/identifier/" + genre.identifier, {
        replaceState: true,
      });
    }
  };
  
  const handleDeleteArtworkForm = async (identifier: string) => {
    const genre = get(activeGenrePage);
    if (genre) {
      await handleDeleteGenreArtwork(identifier);
    }
  };

  const handlePositionArtwork = async (
    artwork: GenreArtwork,
    modifyFn: (x: number) => number
  ) => {
    const genre = get(activeGenrePage);
    if (genre) {
      const newNum = modifyFn(artwork.orderValue);
      await handleGenrePositionChangeArtwork(artwork.identifier, newNum);
    }
  };

  let genreDelta: InsertGenreRequestItem = {
    displayName: $activeGenrePage?.displayName ?? "",
    spotifyUrl: $activeGenrePage?.spotifyUrl,
    youtubeUrl: $activeGenrePage?.youtubeUrl,
    soundcloudUrl: $activeGenrePage?.soundcloudUrl,
    wikipediaUrl: $activeGenrePage?.wikipediaUrl,
  };

  let addArtwork: InsertGenreArtworksRequestItem = {
    genreIdentifier: $activeGenrePage?.identifier,
    contentUrl: "",
    contentCaption:null,
    orderValue: 0,
  };

  $: deltaFormValid = isNonEmptyString(genreDelta.displayName)
  $: artworkFormValid = isNonEmptyString(addArtwork.contentUrl) && addArtwork.orderValue >= 0

</script>

<div>
    <FormTitle
        titleContent="Edit genre {$activeGenrePage?.displayName}"
        {backAction}
    />

    <div>
        <p>
            genre identifier: <span class="font-mono"
                >{$activeGenrePage?.identifier}</span
            >
        </p>
        <p>
            created at: <span class="font-mono"
                >{$activeGenrePage?.createdAt
                    ? toEuropeanTimestamp($activeGenrePage?.createdAt)
                    : ""}</span
            >
        </p>
        <p>
            created by: <span class="font-mono"
                >{$activeGenrePage?.createdBy}</span
            >
        </p>
        <p hidden={!$activeGenrePage?.approvedBy}>
            approved by: <span class="font-mono"
                >{$activeGenrePage?.approvedBy}</span
            >
        </p>
        <p hidden={!$activeGenrePage?.lastEditedAt}>
            last edited at: <span class="font-mono"
                >{$activeGenrePage?.lastEditedAt
                    ? toEuropeanTimestamp($activeGenrePage?.lastEditedAt)
                    : ""}</span
            >
        </p>
        <p>
            visibility status: <span class="font-mono"
                >{$activeGenrePage?.visibilityStatus}</span
            >
        </p>
    </div>

    <hr class="my-6" />
    <FormRequiredExplanation />

    <form on:submit|preventDefault={handleEditForm}>
        <TextInput
            labelContent="display name"
            isRequired={true}
            bind:value={genreDelta.displayName}
            placeholderContent=""
        />

        <TextInput
            labelContent="youtube url"
            bind:value={genreDelta.youtubeUrl}
            placeholderContent=""
        />
        <TextInput
            labelContent="spotify url"
            bind:value={genreDelta.spotifyUrl}
            placeholderContent=""
        />
        <TextInput
            labelContent="wikipedia url"
            bind:value={genreDelta.wikipediaUrl}
            placeholderContent=""
        />
        <TextInput
            labelContent="soundcloud url"
            bind:value={genreDelta.soundcloudUrl}
            placeholderContent=""
        />

        <FormSubmitterButton disabled={!deltaFormValid} />
    </form>

    <hr class="my-6" />

    <div class="mt-6">
        <div>
            {#if $activeGenrePage?.artworks}
                {#each Object.values($activeGenrePage?.artworks).sort(sortArtworks) as artwork}
                    <div
                        class="mt-4 columns"
                        style="align-items:center;display:flex;"
                    >
                        <div class="column is-narrow">
                            <img
                                class="image figure is-rounded mb-4 rounded-lg"
                                height="240"
                                width="300"
                                src={artwork.contentUrl}
                                alt=""
                            />
                            {#if artwork.orderValue > 0}<button
                                    class="btn variant-soft font-bold serif"
                                    on:click={() =>
                                        handlePositionArtwork(
                                            artwork,
                                            (x) => x - 1
                                        )}>⬆️</button
                                >{/if}
                            {#if artwork.orderValue >= 0}<button
                                    class="btn variant-soft font-bold serif"
                                    on:click={() =>
                                        handlePositionArtwork(
                                            artwork,
                                            (x) => x + 1
                                        )}>⬇️</button
                                >{/if}

                            <button
                                on:click={() =>
                                    handleDeleteArtworkForm(artwork.identifier)}
                                type="submit"
                                class="btn variant-soft-error font-bold serif text-sm"
                                >Delete artwork</button
                            >
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
        <FormTitle titleContent="Artwork manager" />
        <form on:submit|preventDefault={handleAddArtworkForm}>
            <TextInput
                labelContent="content URL"
                isRequired={true}
                placeholderContent="Enter the content URL"
                bind:value={addArtwork.contentUrl}
            />

            <TextInput
                labelContent="content caption"
                placeholderContent="Enter the content caption"
                bind:value={addArtwork.contentCaption}
            />

            <TextInput
                labelContent="order value"
                isRequired={true}
                placeholderContent="Enter the sort order (smaller goes first)"
                bind:value={addArtwork.orderValue}
            />
            <FormSubmitterButton disabled={!artworkFormValid} />
        </form>
    </div>
</div>
