<script lang="ts">
    import {
        handleCreateArtistArtworks,
        handleDeleteArtistArtwork,
        handleEditArtist,
    } from "$lib/api/Artist";
    import FormSubmitterButton from "$lib/components/shared/buttons/FormSubmitterButton.svelte";
    import FormRequiredExplanation from "$lib/components/shared/forms/FormRequiredExplanation.svelte";
    import FormTitle from "$lib/components/shared/forms/FormTitle.svelte";
    import TextInput from "$lib/components/shared/forms/TextInput.svelte";
    import { activeArtistPage } from "$lib/stores/artists";

    import { goto } from "$app/navigation";

    import { handleArtistPositionChangeArtwork } from "$lib/api/Artist";
    import { sortArtworks } from "$lib/components/shared/CardCarousel";
    import { isNonEmptyString } from "$lib/forms/Util";
    import { t } from "$lib/i18n/translation";
    import { get } from "svelte/store";
    import type { ArtistArtwork, EditArtist, InsertArtistArtworksRequestItem, InsertArtistsRequestItem } from "../../../../domain/Artist";
    import { toEuropeanTimestamp } from "../../../../domain/DateTime";

    const handleAddArtworkForm = async (e: Event) => {
            await handleCreateArtistArtworks({artistArtworks: [addArtwork]}, $activeArtistPage?.identifier);
    };

    const handleEditForm = async (e: Event) => {
      let editArtist: EditArtist = {identifier : $activeArtistPage?.identifier, ...artistDelta};
      await handleEditArtist({ artistDeltas: [editArtist] }, editArtist.identifier);
    };

    const backAction = async () => {
        const artist = get(activeArtistPage);
        if (!artist) {
            goto("/", { replaceState: true });
        } else {
            goto("/artists/identifier/" + artist.identifier, {
                replaceState: true,
            });
        }
    };
  

    const handleDeleteArtworkForm = async (identifier: string) => {
        const artist = get(activeArtistPage);
        if (artist) {
            await handleDeleteArtistArtwork(identifier);
        }
    };

    const handlePositionArtwork = async (
        artwork: ArtistArtwork,
        modifyFn: (x: number) => number
    ) => {
        const artist = get(activeArtistPage);
        if (artist) {
            const newNum = modifyFn(artwork.orderValue);
            await handleArtistPositionChangeArtwork(
                artwork.identifier,
                newNum,
                artist.identifier
            );
        }
    };

    let artistDelta: InsertArtistsRequestItem = {
        displayName: $activeArtistPage?.displayName ?? "",
        spotifyUrl: $activeArtistPage?.spotifyUrl,
        youtubeUrl: $activeArtistPage?.youtubeUrl,
        soundcloudUrl: $activeArtistPage?.soundcloudUrl,
        wikipediaUrl: $activeArtistPage?.wikipediaUrl,
    };

  let addArtwork: InsertArtistArtworksRequestItem = {
        artistIdentifier: $activeArtistPage?.identifier,
	contentUrl: "",
	contentCaption:null,
	orderValue: 0,
  };

  $: deltaFormValid = isNonEmptyString(artistDelta.displayName)
  $: artworkFormValid = isNonEmptyString(addArtwork.contentUrl) && addArtwork.orderValue >= 0
</script>

<svelte:head>
    <title
        >{$t("i18n.edit")} - {$activeArtistPage?.displayName}
        {$t("i18n.onWikiMusic")}
    </title>
</svelte:head>

<div>
    <div>
        <FormTitle
            titleContent="Edit artist {$activeArtistPage?.displayName}"
            {backAction}
        />

        <div class="mt-4">
            <p>
                artist identifier: <span class="font-mono"
                    >{$activeArtistPage?.identifier}</span
                >
            </p>
            <p>
                created at: <span class="font-mono"
                    >{$activeArtistPage?.createdAt
                        ? toEuropeanTimestamp($activeArtistPage?.createdAt)
                        : ""}</span
                >
            </p>
            <p>
                created by: <span class="font-mono"
                    >{$activeArtistPage?.createdBy}</span
                >
            </p>
            <p hidden={!$activeArtistPage?.approvedBy}>
                approved by: <span class="font-mono"
                    >{$activeArtistPage?.approvedBy}</span
                >
            </p>
            <p hidden={!$activeArtistPage?.lastEditedAt}>
                last edited at: <span class="font-mono"
                    >{$activeArtistPage?.lastEditedAt
                        ? toEuropeanTimestamp($activeArtistPage?.lastEditedAt)
                        : ""}</span
                >
            </p>
            <p>
                visibility status: <span class="font-mono"
                    >{$activeArtistPage?.visibilityStatus}</span
                >
            </p>
        </div>

        <hr class="my-6" />
        <FormRequiredExplanation />

        <form on:submit|preventDefault={handleEditForm}>
            <TextInput
                labelContent="display name"
                isRequired={true}
                bind:value={artistDelta.displayName}
                placeholderContent=""
            />

            <TextInput
                labelContent="youtube url"
                bind:value={artistDelta.youtubeUrl}
                placeholderContent=""
            />
            <TextInput
                labelContent="spotify url"
                bind:value={artistDelta.spotifyUrl}
                placeholderContent=""
            />
            <TextInput
                labelContent="wikipedia url"
                bind:value={artistDelta.wikipediaUrl}
                placeholderContent=""
            />
            <TextInput
                labelContent="soundcloud url"
                bind:value={artistDelta.soundcloudUrl}
                placeholderContent=""
            />

            <FormSubmitterButton disabled={!deltaFormValid} />
        </form>

        <hr class="my-6" />

        <div class="mt-6">
            <div class="my-6">
                {#if $activeArtistPage?.artworks}
                    {#each Object.values($activeArtistPage?.artworks).sort(sortArtworks) as artwork}
                        <div
                            class="mt-4 columns"
                            style="align-items:center;display:flex;"
                        >
                            <div class="column is-narrow">
                                <img
                                    class="image figure is-rounded mb-4"
                                    height="180"
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
                                        handleDeleteArtworkForm(
                                            artwork.identifier
                                        )}
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
</div>
