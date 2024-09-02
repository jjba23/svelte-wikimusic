<script lang="ts">
    import type { Genre } from "../../../domain/Genre";
    import LikeDislikeCardItem from "../shared/LikeDislikeCardItem.svelte";
    import { toEuropeanDate } from "../../../domain/DateTime";
    import ItemCard from "../ItemCard.svelte";
    import { toCarouselItem, sortArtworks } from "../shared/CardCarousel";
    import { t } from "$lib/i18n/translation";
    import { pipe } from "fp-ts/lib/function";

    export let genre: Genre;
</script>

<ItemCard
    items={Object.values(genre.artworks).sort(sortArtworks).map(toCarouselItem)}
    link="/genres/identifier/{genre.identifier}"
    titleContent={genre.displayName}
>
    <div class="text-left justify-left">
        <LikeDislikeCardItem
            likesNumber={Object.values(genre.opinions).filter((x) => x.isLike)
                .length}
            dislikesNumber={Object.values(genre.opinions).filter(
                (x) => x.isDislike
            ).length}
        />
    </div>
    <div class="flex flex-col align-middle justify-right text-right">
        <small>
            {Object.values(genre.comments).length} comments
        </small>

        {#if genre.lastEditedAt}
            <small>
                {$t("i18n.lastEditedAt")}
                {toEuropeanDate(genre.lastEditedAt)}
            </small>
        {:else if genre.createdAt}
            <small>
                {$t("i18n.createdAt")}
                {pipe(genre.createdAt, toEuropeanDate)}
            </small>
        {/if}
    </div>
</ItemCard>
