<script lang="ts">
    import { toEuropeanDate } from "../../../domain/DateTime";
    import type { Song } from "../../../domain/Song";
    import ItemCard from "../ItemCard.svelte";
    import LikeDislikeCardItem from "../shared/LikeDislikeCardItem.svelte";
    import { toCarouselItem, sortArtworks } from "../shared/CardCarousel";
    import { t } from "$lib/i18n/translation";
    import * as O from "fp-ts/Option";
    import { pipe } from "fp-ts/lib/function";

    export let song: Song;
</script>

{#key song.identifier}
    <ItemCard
        items={Object.values(song.artworks)
            .sort(sortArtworks)
            .map(toCarouselItem)}
        link="/songs/identifier/{song.identifier}"
        titleContent={song.displayName}
    >
        <div class="flex flex-row flex-wrap align-middle gap-2">
            <span>{$t("i18n.by")}</span>
            <h5 class="h5">{Object.values(song.artists).join(" & ")}</h5>
        </div>
        <div class="text-left justify-left">
            <LikeDislikeCardItem
                likesNumber={Object.values(song.opinions).filter(
                    (x) => x.isLike
                ).length}
                dislikesNumber={Object.values(song.opinions).filter(
                    (x) => x.isDislike
                ).length}
            />
        </div>
        <div class="flex flex-col align-middle justify-right text-right">
            <small>
                {Object.values(song.comments).length} comments
            </small>

            {#if song.lastEditedAt}
                <small>
                    {$t("i18n.lastEditedAt")}
                    {toEuropeanDate(song.lastEditedAt)}
                </small>
            {:else}
                <small>
                    {$t("i18n.createdAt")}
                    {pipe(song.createdAt, toEuropeanDate)}
                </small>
            {/if}
        </div>
    </ItemCard>
{/key}
