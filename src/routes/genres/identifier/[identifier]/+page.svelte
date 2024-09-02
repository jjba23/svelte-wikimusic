<script lang="ts">
    import { toEuropeanTimestamp } from "../../../../domain/DateTime";
    import * as O from "fp-ts/Option";
    import { flow, pipe } from "fp-ts/lib/function";
    import { activeGenrePage } from "$lib/stores/genres";
    import { goto } from "$app/navigation";
    import {
        handleDeleteGenre,
        handleLikeGenre,
        handleDislikeGenre,
        handleCreateGenreComments,
    } from "$lib/api/Genre";
    import { get } from "svelte/store";
    import EntityButtons from "$lib/components/shared/EntityButtons.svelte";
    import CommentPlacer from "$lib/components/shared/CommentPlacer.svelte";
    import LikeDislikeCardItem from "$lib/components/shared/LikeDislikeCardItem.svelte";

    import CommentBox from "$lib/components/shared/CommentBox.svelte";
    import { ArrowRight16 } from "svelte-octicons";
    import CardCarousel from "$lib/components/shared/CardCarousel.svelte";
    import {
        toCarouselItem,
        sortArtworks,
    } from "$lib/components/shared/CardCarousel";
    import CopyButton from "$lib/components/CopyButton.svelte";

    const handleDelete = async (_e: any) => {
        const genre = get(activeGenrePage);
        if (genre) {
            await handleDeleteGenre(genre.identifier);
        }
    };

    const handleLike = async (_e: any) => {
        const genre = get(activeGenrePage);
        if (genre) {
            await handleLikeGenre(genre.identifier);
        }
    };

    const handleDislike = async (_e: any) => {
        const genre = get(activeGenrePage);
        if (genre) {
            await handleDislikeGenre(genre.identifier);
        }
    };

    const handleComment = async (e: any) => {
        const genre = get(activeGenrePage);
        if (genre) {
            await handleCreateGenreComments(e);
        }
    };

    const handleEdit = async (e: any) => {
        goto(`/genres/edit/${$activeGenrePage?.identifier}`);
    };
</script>

<div>
    {#if $activeGenrePage}
        <h1 class="h2">
            {$activeGenrePage.displayName}
        </h1>
        <section class="mt-6">
            <div class="columns is-multiline">
                <div class="column is-half">
                    <CardCarousel
                        items={Object.values($activeGenrePage?.artworks)
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
                                $activeGenrePage.opinions
                            ).filter((x) => x.isLike).length}
                            dislikesNumber={Object.values(
                                $activeGenrePage.opinions
                            ).filter((x) => x.isDislike).length}
                            verbose={true}
                        />

                        <table class="mt-4 table table-hover">
                            <tbody>
                                <tr>
                                    <th>identifier</th><td
                                        ><code class="code"
                                            >{$activeGenrePage.identifier}</code
                                        ><CopyButton
                                            x={$activeGenrePage.identifier}
                                        /></td
                                    >
                                </tr>
                                <tr>
                                    <th>created at</th><td
                                        >{toEuropeanTimestamp(
                                            $activeGenrePage.createdAt
                                        )}</td
                                    >
                                </tr>
                                {#if $activeGenrePage.lastEditedAt}
                                    <tr>
                                        <th>last edited at</th><td
                                            >{toEuropeanTimestamp(
                                                $activeGenrePage.lastEditedAt
                                            )}</td
                                        >
                                    </tr>
                                {/if}
                            </tbody>
                        </table>

                        <hr class="my-6" />

                        <div class="columns is-multiline is-vcentered">
                            {#if $activeGenrePage.spotifyUrl}
                                <div>
                                    <a
                                        target="_blank"
                                        href={$activeGenrePage.spotifyUrl}
                                        ><ArrowRight16 />&nbsp;Spotify</a
                                    >
                                </div>
                            {/if}

                            {#if $activeGenrePage.wikipediaUrl}
                                <div>
                                    <a
                                        target="_blank"
                                        href={$activeGenrePage.wikipediaUrl}
                                        ><ArrowRight16 />&nbsp;Wikipedia</a
                                    >
                                </div>
                            {/if}

                            {#if $activeGenrePage.soundcloudUrl}
                                <div>
                                    <a
                                        target="_blank"
                                        href={$activeGenrePage.soundcloudUrl}
                                        ><ArrowRight16 />&nbsp;SoundCloud</a
                                    >
                                </div>
                            {/if}

                            {#if $activeGenrePage.youtubeUrl}
                                <div>
                                    <a
                                        target="_blank"
                                        href={$activeGenrePage.youtubeUrl}
                                        ><ArrowRight16 />&nbsp;YouTube</a
                                    >
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <hr class="my-6" />
                <div>
                    <p class="text mb-4">
                        {Object.values($activeGenrePage.comments).length} comments
                    </p>

                    {#each Object.values($activeGenrePage.comments) as comment}
                        <CommentBox
                            identifier={comment.node.identifier}
                            identifierFieldName="genreIdentifier"
                            entityIdentifier={$activeGenrePage.identifier}
                            contents={comment.node.contents}
                            createdBy={comment.node.createdBy}
                            createdAt={comment.node.createdAt}
                            indentedAmount={0}
                            handler={handleComment}
                            subNodes={comment.subNodes}
                        />
                    {/each}
                    <CommentPlacer
                        identifier={$activeGenrePage.identifier}
                        identifierFieldName="genreIdentifier"
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
