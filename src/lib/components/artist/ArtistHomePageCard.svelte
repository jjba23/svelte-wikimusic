<script lang="ts">
    import { toEuropeanDate } from "../../../domain/DateTime";
    import type { Artist } from "../../../domain/Artist";
    import LikeDislikeCardItem from "../shared/LikeDislikeCardItem.svelte";
    import { toCarouselItem, sortArtworks } from "../shared/CardCarousel";
    import ItemCard from "../ItemCard.svelte";
    import { t } from "$lib/i18n/translation";
    import * as O from "fp-ts/Option";
    import { flow, pipe } from "fp-ts/lib/function";

    export let artist: Artist;
</script>

<ItemCard
    items={Object.values(artist.artworks)
        .sort(sortArtworks)
        .map(toCarouselItem)}
    link="/artists/identifier/{artist.identifier}"
    titleContent={artist.displayName}
>
    <div class="text-left justify-left">
        <LikeDislikeCardItem
            likesNumber={Object.values(artist.opinions).filter((x) => x.isLike)
                .length}
            dislikesNumber={Object.values(artist.opinions).filter(
                (x) => x.isDislike
            ).length}
        />
    </div>
    <div class="flex flex-col align-middle justify-right text-right">
        <small>
            {Object.values(artist.comments).length} comments
        </small>

        {#if artist.lastEditedAt}
            <small>
                {$t("i18n.lastEditedAt")}
                {toEuropeanDate(artist.lastEditedAt)}
            </small>
        {:else}
            <small>
                {$t("i18n.createdAt")}
                {pipe(artist.createdAt, toEuropeanDate)}
            </small>
        {/if}
    </div>
</ItemCard>
