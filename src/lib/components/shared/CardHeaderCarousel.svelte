<script lang="ts">
    import * as O from "fp-ts/Option";
    import { pipe } from "fp-ts/lib/function";
    import { onMount } from "svelte";
    import { quintOut } from "svelte/easing";
    import { slide } from "svelte/transition";
    import type { CardCarouselItem } from "./CardCarousel";
    import { makeRandomDuration } from "./CardCarousel";

    export let items: CardCarouselItem[] = [];
    export let imageLink: string = "#";

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
        clearInterval(randImageInterval);
        next();
    };

    const manualPrev = () => {
        clearInterval(randImageInterval);
        prev();
    };

    let randImageInterval = setInterval(() => {
        next();
    }, makeRandomDuration(3500));

    onMount(() => {
        return () => {
            clearInterval(randImageInterval);
        };
    });
</script>

<header>
    {#each items as item, i}
        {#if i == visibleItem}
            <a href={imageLink}>
                <img
                    transition:slide={{
                        delay: 100,
                        duration: 300,
                        easing: quintOut,
                        axis: "x",
                    }}
                    class="bg-black/50 w-full aspect-[16/9] rounded-t-xl"
                    src={item.url}
                    alt={item.alt ? pipe(item.alt, O.toNullable) : ""}
                    loading="lazy"
                />
            </a>
        {/if}
    {/each}
</header>
<div hidden={items.length <= 1}>
    <div hidden={items.length <= 1}>
        <button
            class="font-bold py-1 px-3 rounded-lg serif"
            on:click={manualPrev}>↼</button
        >
        <button
            class="font-bold py-1 px-3 rounded-lg serif"
            on:click={manualNext}>⇀</button
        >
    </div>
</div>
