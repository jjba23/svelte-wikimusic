<script lang="ts">
  import {
      handleCreateSongArtists,
      handleCreateSongArtworks,
      handleDeleteSongArtwork,
      handleDeleteSongContent,
      handleEditSong,
      handleEditSongContents,
      handlePositionChangeArtwork
  } from "$lib/api/Song";
  import FormSubmitterButton from "$lib/components/shared/buttons/FormSubmitterButton.svelte";
  import FormRequiredExplanation from "$lib/components/shared/forms/FormRequiredExplanation.svelte";
  import FormTitle from "$lib/components/shared/forms/FormTitle.svelte";
  import TextInput from "$lib/components/shared/forms/TextInput.svelte";
  import { activeSongPage } from "$lib/stores/songs";

  import { goto } from "$app/navigation";
  import { sortArtworks } from "$lib/components/shared/CardCarousel";
  import FileInput from "$lib/components/shared/forms/FileInput.svelte";
  import TextArea from "$lib/components/shared/forms/TextArea.svelte";
  import SongVersionCreateForm from "$lib/components/song/SongVersionCreateForm.svelte";
  import { getFileBase64OrIfEmptyUndefined, isNonEmptyString } from "$lib/forms/Util";
  import { t } from "$lib/i18n/translation";
  import { get } from "svelte/store";
  import { toEuropeanTimestamp } from "../../../../domain/DateTime";
  import type { EditSong, EditSongContentsItem, InsertSongArtworksRequestItem, InsertSongsRequestItem, SongArtwork } from "../../../../domain/Song";

  const handleAddArtworkForm = async (e: Event) => {
    await handleCreateSongArtworks({songArtworks: [addArtwork]}, $activeSongPage?.identifier);        
  };

  const handleEditForm = async (e: Event) => {
    let editSong: EditSong = {identifier: $activeSongPage?.identifier, ...songDelta}
    await handleEditSong({songDeltas: [editSong]}, editSong.identifier);
  };

  const handleEditSongContentsForm = async (e: any,
    contentDelta: EditSongContentsItem
  ) => {
    let pdf = await getFileBase64OrIfEmptyUndefined(
            "pdfFile",
            new FormData(e.target)
        );
        let gp5 = await getFileBase64OrIfEmptyUndefined(
            "gp5File",
            new FormData(e.target)
        );
    
    // TODO remove mutation
      contentDelta.pdfContents = pdf
    contentDelta.guitarProContents = gp5
      await handleEditSongContents({songContentDeltas: [contentDelta]}, $activeSongPage?.identifier);
  };

 

  const handleUpdateArtists = async (e: any) => {
    const song = get(activeSongPage);
    if (song) {
      const formData = new FormData(e.target);
      await handleCreateSongArtists(
        [artistToAddRelation],
        song.identifier
      );
    }
  };
  
  const backAction = async () => {
    const song = get(activeSongPage);
    if (!song) {
      goto("/", { replaceState: true });
    } else {
      goto("/songs/identifier/" + song.identifier, {
        replaceState: true,
      });
    }
  };

  const handleDeleteArtworkForm = async (identifier: string) => {
    const song = get(activeSongPage);
    if (song) {
      await handleDeleteSongArtwork(identifier);
    }
  };
  const handleDeleteSongContentForm = async (identifier: string) => {
    const song = get(activeSongPage);
    if (song) {
      await handleDeleteSongContent(identifier);
    }
  };

  const handlePositionArtwork = async (
    artwork: SongArtwork,
    modifyFn: (x: number) => number
  ) => {
    const song = get(activeSongPage);
    if (song) {
      const newNum = modifyFn(artwork.orderValue);
      await handlePositionChangeArtwork(
        artwork.identifier,
        newNum,
        song.identifier
      );
    }
  };

  let artistToAddRelation = ""

  let songDelta: InsertSongsRequestItem = {
    displayName: $activeSongPage?.displayName ?? "",
    spotifyUrl: $activeSongPage?.spotifyUrl,
    youtubeUrl: $activeSongPage?.youtubeUrl,
    soundcloudUrl: $activeSongPage?.soundcloudUrl,
    wikipediaUrl: $activeSongPage?.wikipediaUrl,
    musicKey:  $activeSongPage?.musicKey,
    musicTuning:  $activeSongPage?.musicTuning,
    musicCreationDate:  $activeSongPage?.musicCreationDate,
    albumName:  $activeSongPage?.albumName,
    albumInfoLink:  $activeSongPage?.albumInfoLink
  };

  let addArtwork: InsertSongArtworksRequestItem = {
    songIdentifier: $activeSongPage?.identifier,
    contentUrl: "",
    contentCaption:null,
    orderValue: 0,
  };



  $: selectedVersionToEdit = $activeSongPage?.contents ? Object.values($activeSongPage?.contents)[0] : {};
  
  $: deltaFormValid = isNonEmptyString(songDelta.displayName)
  $: artworkFormValid = isNonEmptyString(addArtwork.contentUrl) && addArtwork.orderValue >= 0




</script>

<svelte:head>
    <title
        >{$t("i18n.edit")} - {$activeSongPage?.displayName}
        {$t("i18n.onWikiMusic")}
    </title>
</svelte:head>

<div>
    <FormTitle
        titleContent="Edit song: {$activeSongPage?.displayName}"
        {backAction}
    />

    <div class="mt-4">
        <p>
            created at: <span class="font-mono"
                >{$activeSongPage?.createdAt
                    ? toEuropeanTimestamp($activeSongPage.createdAt)
                    : ""}</span
            >
        </p>
        <p>
            created by: <code class="code">{$activeSongPage?.createdBy}</code>
        </p>
        <p hidden={!$activeSongPage?.approvedBy}>
            approved by: <span class="font-mono"
                >{$activeSongPage?.approvedBy}</span
            >
        </p>
        <p hidden={!$activeSongPage?.lastEditedAt}>
            last edited at: <span class="font-mono"
                >{$activeSongPage?.lastEditedAt
                    ? toEuropeanTimestamp($activeSongPage?.lastEditedAt)
                    : ""}</span
            >
        </p>
        <p>
            visibility status: <span class="font-mono"
                >{$activeSongPage?.visibilityStatus}</span
            >
        </p>
        <p>
            song identifier: <code class="code"
                >{$activeSongPage?.identifier}</code
            >
        </p>
    </div>

    <hr class="my-6" />
    <FormRequiredExplanation />

    <form on:submit|preventDefault={handleEditForm} class="container">
        <TextInput
            labelContent="display name"
            isRequired={true}
            placeholderContent=""
            bind:value={songDelta.displayName}
        />
        <TextInput
            labelContent="music key"
            placeholderContent=""
            bind:value={songDelta.musicKey}
        />
        <TextInput
            labelContent="music tuning"
            placeholderContent=""
            bind:value={songDelta.musicTuning}
        />
        <TextInput
            labelContent="music creation date"
            placeholderContent=""
            bind:value={songDelta.musicCreationDate}
        />
        <TextInput
            labelContent="album name"
            placeholderContent=""
            bind:value={songDelta.albumName}
        />
        <TextInput
            labelContent="album info link"
            classes="input p-2 font-mono"
            placeholderContent=""
            bind:value={songDelta.albumInfoLink}
        />
        <TextInput
            labelContent="youtube url"
            classes="input p-2 font-mono"
            placeholderContent=""
            bind:value={songDelta.youtubeUrl}
        />
        <TextInput
            labelContent="spotify url"
            classes="input p-2 font-mono"
            placeholderContent=""
            bind:value={songDelta.spotifyUrl}
        />
        <TextInput
            labelContent="wikipedia url"
            classes="input p-2 font-mono"
            placeholderContent=""
            bind:value={songDelta.wikipediaUrl}
        />
        <TextInput
            labelContent="soundcloud url"
            classes="input p-2 font-mono"
            placeholderContent=""
            bind:value={songDelta.soundcloudUrl}
        />

        <FormSubmitterButton />
    </form>

    <hr class="my-6" />

    <div class="mt-6">
        <FormTitle titleContent="Artwork manager" />

        <div class="my-6">
            {#if $activeSongPage?.artworks}
                {#each Object.values($activeSongPage?.artworks).sort(sortArtworks) as artwork}
                    <div class="mt-4">
                        <div class="column is-narrow">
                            <img
                                class="image figure is-rounded mb-4 rounded-lg"
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
        <form on:submit|preventDefault={handleAddArtworkForm} class="container">
            <TextInput
                labelContent="content URL"
                isRequired={true}
                classes="input p-2 font-mono"
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
                minValue={0}
                placeholderContent="Enter the sort order (smaller goes first)"
                bind:value={addArtwork.orderValue}
            />

            <FormSubmitterButton />
        </form>
    </div>

    <hr class="my-6" />
    <div>
        <FormTitle titleContent="Artists manager" />
        {#if $activeSongPage}
            <div class="p-4">
                {#each Object.entries($activeSongPage.artists) as [k, v]}
                    <a
                        class="text-tertiary-500 font-bold"
                        href="/artists/identifier/{k}"
                        ><h4 class="h3">{v}</h4></a
                    >
                {/each}
            </div>
            <p class="mt-6 mb-2 is-family-serif is-title is-size-5">
                TODO: Delete artist relation
            </p>
        {/if}
        <p class="mt-6 mb-2 is-family-serif is-title is-size-5">
            Add artist relation:
        </p>
        <form on:submit|preventDefault={handleUpdateArtists}>
            <TextInput
                labelContent="artist UUID"
                isRequired={true}
                placeholderContent="Enter UUID of an artist"
                classes="input p-2 font-mono"
                bind:value={artistToAddRelation}
            />
            <FormSubmitterButton />
        </form>

        <hr class="my-6" />

        <h4 class="h2">Manage versions</h4>
        {#if $activeSongPage}
            <div class="my-4 flex flex-wrap flex-row gap-4">
                {#each Object.entries($activeSongPage.contents) as [k, v]}
                    <button
                        class="btn variant-filled font-bold serif"
                        on:click={() => (selectedVersionToEdit = v)}
                        >{v.versionName} - {v.instrumentType}</button
                    >
                {/each}
                <button
                    class="btn variant-filled font-bold serif"
                    on:click={() => (selectedVersionToEdit = null)}
                    >+ Add a version</button
                >
            </div>
            {#if !selectedVersionToEdit}
                <SongVersionCreateForm
                    songIdentifier={$activeSongPage?.identifier}
                />
            {:else}
                <form
                    on:submit|preventDefault={(e) =>
                        handleEditSongContentsForm(e, selectedVersionToEdit)}
                >
                    <TextInput
                        labelContent="Version name"
                        isRequired={true}
                        bind:value={selectedVersionToEdit.versionName}
                    />
                    <TextInput
                        labelContent="Instrument type"
                        isRequired={true}
                        bind:value={selectedVersionToEdit.instrumentType}
                    />
                    <TextArea
                        labelContent="ASCII legend"
                        classes="textarea p-2 min-h-[240px] font-mono"
                        bind:value={selectedVersionToEdit.asciiLegend}
                    />
                    <TextArea
                        labelContent="ASCII contents"
                        classes="textarea p-2 min-h-[440px] font-mono"
                        bind:value={selectedVersionToEdit.asciiContents}
                    />
                    <FileInput
                        labelContent="PDF file"
                        fieldIdentifier="pdfFile"
                    />
                    <FileInput
                        labelContent="GuitarPro file"
                        fieldIdentifier="gp5File"
                    />

                    <p>identifier: {selectedVersionToEdit?.identifier}</p>
                    <p>
                        song identifier: {selectedVersionToEdit?.songIdentifier}
                    </p>
                    <FormSubmitterButton />
                    <button
                        on:click={() =>
                            handleDeleteSongContentForm(
                                selectedVersionToEdit.identifier
                            )}
                        type="button"
                        class="btn variant-soft-error font-bold serif"
                        >🗑️ Delete {selectedVersionToEdit?.versionName}</button
                    >
                </form>
            {/if}
        {/if}
    </div>
</div>
