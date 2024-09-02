<script lang="ts">
    import { toEuropeanTimestamp } from "../../../../domain/DateTime";

    import { activeArtistPage } from "$lib/stores/artists";
    import { goto } from "$app/navigation";
    import {
        handleDeleteArtist,
        handleLikeArtist,
        handleDislikeArtist,
        handleCreateArtistComments,
    } from "$lib/api/Artist";
    import { get } from "svelte/store";
    import EntityButtons from "$lib/components/shared/EntityButtons.svelte";
    import CommentPlacer from "$lib/components/shared/CommentPlacer.svelte";
    import LikeDislikeCardItem from "$lib/components/shared/LikeDislikeCardItem.svelte";

    import CommentBox from "$lib/components/shared/CommentBox.svelte";
    import { t } from "$lib/i18n/translation";
    import CardCarousel from "$lib/components/shared/CardCarousel.svelte";
    import {
        toCarouselItem,
        sortArtworks,
    } from "$lib/components/shared/CardCarousel";
    import CopyButton from "$lib/components/CopyButton.svelte";
    import * as O from "fp-ts/Option";
    import { flow, pipe } from "fp-ts/lib/function";

    const handleDelete = async (_e: any) => {
        const artist = get(activeArtistPage);
        if (artist) {
            await handleDeleteArtist(artist.identifier);
        }
    };

    const handleLike = async (_e: any) => {
        const artist = get(activeArtistPage);
        if (artist) {
            await handleLikeArtist(artist.identifier);
        }
    };

    const handleDislike = async (_e: any) => {
        const artist = get(activeArtistPage);
        if (artist) {
            await handleDislikeArtist(artist.identifier);
        }
    };

    const handleComment = async (e: any) => {
        const artist = get(activeArtistPage);
        if (artist) {
            await handleCreateArtistComments(e);
        }
    };

    const handleEdit = async () => {
        goto(`/artists/edit/${$activeArtistPage?.identifier}`);
    };
</script>

<svelte:head>
    <title>{$activeArtistPage?.displayName}&nbsp;{$t("i18n.onWikiMusic")}</title
    >
</svelte:head>

<div>
    {#if $activeArtistPage}
        <h1 class="h2">{$activeArtistPage.displayName}</h1>
        <section class="mt-6">
            <div class="columns is-multiline">
                <div class="column is-half">
                    <CardCarousel
                        items={Object.values($activeArtistPage?.artworks)
                            .sort(sortArtworks)
                            .map(toCarouselItem)}
                        showCaption={true}
                    />
                </div>
                <div class="column is-half">
                    <EntityButtons
                        {handleLike}
                        {handleDislike}
                        {handleDelete}
                        {handleEdit}
                    />

                    <div class="mt-4 table-container">
                        <LikeDislikeCardItem
                            likesNumber={Object.values(
                                $activeArtistPage.opinions
                            ).filter((x) => x.isLike).length}
                            dislikesNumber={Object.values(
                                $activeArtistPage.opinions
                            ).filter((x) => x.isDislike).length}
                            verbose={true}
                        />

                        <table class="mt-4 table table-hover">
                            <tbody>
                                <tr>
                                    <th>identifier</th><td
                                        ><code class="code text-sm"
                                            >{$activeArtistPage.identifier}</code
                                        ><CopyButton
                                            x={$activeArtistPage.identifier}
                                        /></td
                                    >
                                </tr>
                                <tr>
                                    <th>created at</th><td
                                        >{toEuropeanTimestamp(
                                            $activeArtistPage.createdAt
                                        )}</td
                                    >
                                </tr>
                                {#if $activeArtistPage.lastEditedAt}
                                    <tr>
                                        <th>last edited at</th><td
                                            >{toEuropeanTimestamp(
                                                $activeArtistPage.lastEditedAt
                                            )}
                                        </td>
                                    </tr>
                                {/if}
                            </tbody>
                        </table>

                        <div
                            class="columns is-multiline is-vcentered ml-4 mt-4"
                        >
                            <ul>
                                {#if $activeArtistPage.spotifyUrl}
                                    <li>
                                        More songs from {$activeArtistPage.displayName}
                                        on&nbsp;
                                        <a
                                            target="_blank"
                                            href={$activeArtistPage.spotifyUrl}
                                        >
                                            Spotify</a
                                        >
                                    </li>
                                {/if}

                                {#if $activeArtistPage.wikipediaUrl}
                                    <li class="mt-3">
                                        Read more about {$activeArtistPage.displayName}
                                        on&nbsp;
                                        <a
                                            target="_blank"
                                            href={$activeArtistPage.wikipediaUrl}
                                            >Wikipedia</a
                                        >
                                    </li>
                                {/if}

                                {#if $activeArtistPage.soundcloudUrl}
                                    <li class="mt-3">
                                        More songs from {$activeArtistPage.displayName}
                                        on&nbsp;
                                        <a
                                            target="_blank"
                                            href={$activeArtistPage.soundcloudUrl}
                                            >SoundCloud</a
                                        >
                                    </li>
                                {/if}

                                {#if $activeArtistPage.youtubeUrl}
                                    <li class="mt-3">
                                        See more about {$activeArtistPage.displayName}
                                        on&nbsp;
                                        <a
                                            target="_blank"
                                            href={$activeArtistPage.youtubeUrl}
                                            >YouTube</a
                                        >
                                    </li>
                                {/if}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <hr class="my-6" />
                <div>
                    <p class="text mb-4">
                        {Object.values($activeArtistPage.comments).length} comments
                    </p>

                    {#each Object.values($activeArtistPage.comments) as comment}
                        <CommentBox
                            identifier={comment.node.identifier}
                            identifierFieldName="artistIdentifier"
                            entityIdentifier={$activeArtistPage.identifier}
                            contents={comment.node.contents}
                            createdBy={comment.node.createdBy}
                            createdAt={comment.node.createdAt}
                            indentedAmount={0}
                            handler={handleComment}
                            subNodes={comment.subNodes}
                        />
                    {/each}
                    <CommentPlacer
                        identifier={$activeArtistPage.identifier}
                        identifierFieldName="artistIdentifier"
                        parentIdentifier={undefined}
                        handler={handleComment}
                    />
                </div>
            </div>
        </section>
    {:else}
        <p>So empty here...</p>
    {/if}
</div>
