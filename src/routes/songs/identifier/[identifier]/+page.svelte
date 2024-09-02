<script lang="ts">
    import { goto } from "$app/navigation";
    
    import {
        handleCreateSongComments,
        handleDeleteSong,
        handleDislikeSong,
        handleLikeSong,
    } from "$lib/api/Song";
    import CardCarousel from "$lib/components/shared/CardCarousel.svelte";
    import CommentBox from "$lib/components/shared/CommentBox.svelte";
    import CommentPlacer from "$lib/components/shared/CommentPlacer.svelte";
    import EntityButtons from "$lib/components/shared/EntityButtons.svelte";
    import LikeDislikeCardItem from "$lib/components/shared/LikeDislikeCardItem.svelte";
    import { activeSongPage } from "$lib/stores/songs";
    import { get } from "svelte/store";
    import { toEuropeanTimestamp } from "../../../../domain/DateTime";

    import CopyButton from "$lib/components/CopyButton.svelte";
    import {
        sortArtworks,
        toCarouselItem,
    } from "$lib/components/shared/CardCarousel";
    import SongVersionFragment from "$lib/components/song/SongVersionFragment.svelte";
    import { t } from "$lib/i18n/translation";
    import { pipe } from "fp-ts/lib/function";

    const handleDelete = async (_e: any) => {
        const song = get(activeSongPage);
        if (song) {
            await handleDeleteSong(song.identifier);
        }
    };

    const handleLike = async (_e: any) => {
        const song = get(activeSongPage);
        if (song) {
            await handleLikeSong(song.identifier);
        }
    };

    const handleDislike = async (_e: any) => {
        const song = get(activeSongPage);
        if (song) {
            await handleDislikeSong(song.identifier);
        }
    };

    const handleComment = async (e: any) => {
        const song = get(activeSongPage);
        if (song) {
            await handleCreateSongComments(e);
        }
    };

    const handleEdit = async () => {
        goto(`/songs/edit/${$activeSongPage?.identifier}`);
    };

    $: selectedVersionToSee =
      $activeSongPage?.contents ? (Object.entries($activeSongPage?.contents)?.at(0) ?? [])[0] : undefined;
</script>

<div class="mt-4">
    {#if $activeSongPage}
        <h1 class="h2">
            {$activeSongPage.displayName} -
            <span>
                {#each Object.entries($activeSongPage.artists) as [k, v]}
                    <a class="text-primary-500" href="/artists/identifier/{k}"
                        >{v}</a
                    >
                {/each}
            </span>
        </h1>
        <section class="mt-4">
            <div class="inline-flex flex-col">
                <div class="">
                    <CardCarousel
                        items={Object.values($activeSongPage?.artworks)
                            .sort(sortArtworks)
                            .map(toCarouselItem)}
                        showCaption={true}
                    />
                </div>
                <div class="">
                    <EntityButtons
                        {handleLike}
                        {handleDislike}
                        {handleDelete}
                        {handleEdit}
                    />

                    <div class="mt-4 table-container">
                        <LikeDislikeCardItem
                            likesNumber={Object.values(
                                $activeSongPage.opinions
                            ).filter((x) => x.isLike).length}
                            dislikesNumber={Object.values(
                                $activeSongPage.opinions
                            ).filter((x) => x.isDislike).length}
                            verbose={true}
                        />

                        <table class="mt-4 table table-hover">
                            <tbody>
                                <tr>
                                    <th>identifier</th>
                                    <td class="flex flex-wrap">
                                        <code class="code text-sm">
                                            {$activeSongPage.identifier}</code
                                        ><CopyButton
                                            x={$activeSongPage.identifier}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>created at</th><td
                                        >{toEuropeanTimestamp(
                                            $activeSongPage.createdAt
                                        )}</td
                                    >
                                </tr>
                                {#if $activeSongPage.lastEditedAt}
                                    <tr>
                                        <th>last edited at</th>
                                        <td
                                            >{pipe(
                                                $activeSongPage.lastEditedAt,
                                                toEuropeanTimestamp
                                            )}</td
                                        >
                                    </tr>
                                {/if}
                                {#if $activeSongPage.albumName}
                                    <tr>
                                        <th>album:</th>
                                        <td>{$activeSongPage.albumName}</td>
                                    </tr>
                                {/if}

                                {#if $activeSongPage.albumInfoLink}
                                    <tr>
                                        <th>album info:</th>
                                        <td
                                            ><a
                                                href={$activeSongPage.albumInfoLink}
                                                >read more about the album</a
                                            ></td
                                        >
                                    </tr>
                                {/if}

                                {#if $activeSongPage.musicKey}
                                    <tr>
                                        <th>key</th>
                                        <td>{$activeSongPage.musicKey}</td>
                                    </tr>
                                {/if}

                                {#if $activeSongPage.musicTuning}
                                    <tr>
                                        <th>tuning</th>
                                        <td>{$activeSongPage.musicTuning}</td>
                                    </tr>
                                {/if}

                                {#if $activeSongPage.musicCreationDate}
                                    <tr>
                                        <th>composed at</th>
                                        <td
                                            >{$activeSongPage.musicCreationDate}</td
                                        >
                                    </tr>
                                {/if}
                            </tbody>
                        </table>

                        <div class="my-6">
                            {#if $activeSongPage.spotifyUrl}
                                <div class="flex w-full h-auto">
                                    <iframe
                                        title={$activeSongPage.displayName}
                                        src={$activeSongPage.spotifyUrl ?? ""}
                                        frameBorder="0"
                                        allowfullscreen={false}
                                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                        loading="lazy"
                                        class="rounded-lg"
                                    />
                                </div>
                            {/if}
                        </div>

                        <div
                            class="flex flex-row flex-wrap gap-1 text-sm justify-left"
                        >
                            {#if $activeSongPage.wikipediaUrl}
                                <a
                                    target="_blank"
                                    class="btn variant-soft"
                                    href={pipe($activeSongPage.wikipediaUrl)}
                                >
                                    <span
                                        >📔 {$activeSongPage.displayName} on Wikipedia</span
                                    >
                                </a>
                            {/if}

                            {#if $activeSongPage.soundcloudUrl}
                                <a
                                    target="_blank"
                                    class="btn variant-filled-warning"
                                    href={pipe($activeSongPage.soundcloudUrl)}
                                    ><span
                                        >☁ {$activeSongPage.displayName} on SoundCloud</span
                                    ></a
                                >
                            {/if}

                            {#if $activeSongPage.youtubeUrl}
                                <a
                                    target="_blank"
                                    class="btn variant-soft-error"
                                    href={pipe($activeSongPage.youtubeUrl)}
                                    ><span
                                        >🎥 {$activeSongPage.displayName} on YouTube</span
                                    ></a
                                >
                            {/if}
                        </div>
                    </div>
                </div>
            </div>

            <hr class="mt-8" />

            <section class="mt-6">
                {#if $activeSongPage}
                    <div
                        class="flex gap-2 flex-row items-center align-middle justify-center"
                    >
                        <em class="normal-case text-lg"
                            >{$t("i18n.readVersionOf")}</em
                        >
                        <h3 class="h3 my-6">
                            {$activeSongPage.displayName}
                        </h3>
                    </div>

                    <div
                        class="my-4 flex flex-wrap flex-row gap-4 text-center justify-center"
                    >
                        {#each Object.entries($activeSongPage.contents) as [k, v]}
                            <button
                                class="btn variant-filled font-bold serif"
                                on:click={() => (selectedVersionToSee = k)}
                                >{v.versionName} - {v.instrumentType}</button
                            >
                        {/each}
                    </div>

                    <div>
                        {#each Object.entries($activeSongPage.contents) as [k, v]}
                            <div
                                hidden={selectedVersionToSee != k}
                                id={v.identifier}
                            >
                                <SongVersionFragment {v} />
                            </div>
                        {/each}
                    </div>
                {/if}
            </section>
            <hr class="my-6" />
            <p class="text my-6 h3">
                {Object.values($activeSongPage.comments).length} comments
            </p>
            <div>
                {#each Object.values($activeSongPage.comments) as comment}
                    <CommentBox
                        identifier={comment.node.identifier}
                        identifierFieldName="songIdentifier"
                        entityIdentifier={$activeSongPage.identifier}
                        contents={comment.node.contents}
                        createdBy={comment.node.createdBy}
                        createdAt={comment.node.createdAt}
                        indentedAmount={0}
                        handler={handleComment}
                        subNodes={comment.subNodes}
                    />
                {/each}
                <CommentPlacer
                    identifier={$activeSongPage.identifier}
                    identifierFieldName="songIdentifier"
                    parentIdentifier={undefined}
                    handler={handleComment}
                />
            </div>
        </section>
    {:else}
        <p>So empty here...</p>
    {/if}
</div>
