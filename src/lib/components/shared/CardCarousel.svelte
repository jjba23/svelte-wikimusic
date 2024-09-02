<script lang="ts">
    import * as O from "fp-ts/Option";
    import { pipe } from "fp-ts/lib/function";
    import { quintOut } from "svelte/easing";
    import { slide } from "svelte/transition";
    import type { CardCarouselItem } from "./CardCarousel";

    export let items: CardCarouselItem[] = [];
    export let imageLink: string = "#";
    export let showCaption: boolean = false;

    let visibleItem: number = 0;

    const next = () => {
        if (visibleItem == items.length - 1) {
            visibleItem = 0;
        } else {
            visibleItem++;
        }
    };
    const prev = () => {
        if (visibleItem == 0) {
            visibleItem = items.length - 1;
        } else {
            visibleItem--;
        }
    };

    const manualNext = () => {
        next();
    };

    const manualPrev = () => {
        prev();
    };
</script>

<div class="w-3/4 md:w-3/4 lg:1/2 h-auto my-4">
    {#each items as item, i}
        {#if i == visibleItem}
            <div>
                <a href={imageLink}>
                    <figure>
                        <img
                            transition:slide={{
                                delay: 100,
                                duration: 300,
                                easing: quintOut,
                                axis: "x",
                            }}
                            class="rounded-xl w-3/4 md:w-3/4 xl:1/2 h-auto"
                            alt={item.alt ? pipe(item.alt, O.toNullable) : ""}
                            src={item.url}
                            loading="lazy"
                        />
                        {#if showCaption}
                            {#if item.alt}
                                <figcaption>{item.alt}</figcaption>
                            {/if}
                        {/if}
                    </figure>
                </a>
            </div>
        {/if}
    {/each}
</div>
<div hidden={items.length <= 1} class="my-4">
    <div hidden={items.length <= 1}>
        <button
            class="font-bold py-1 px-3 rounded-lg serif"
            on:click={manualPrev}>↼ prev</button
        >
        <button
            class="font-bold py-1 px-3 rounded-lg serif"
            on:click={manualNext}>next ⇀</button
        >
    </div>
</div>
