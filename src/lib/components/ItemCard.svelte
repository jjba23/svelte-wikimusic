<script lang="ts">
    import { t } from "$lib/i18n/translation";
    import type { CardCarouselItem } from "./shared/CardCarousel";
    import CardHeaderCarousel from "./shared/CardHeaderCarousel.svelte";

    export let items: CardCarouselItem[] = [];
    export let link = "#";
    export let titleContent = "";
</script>

<div class="card card-hover">
    <CardHeaderCarousel {items} imageLink={link} />
    <section class="p-4">
        <a href={link}><h3 class="h3 my-2">{titleContent}</h3></a>
        <slot />
    </section>
    <footer class="card-footer text-center">
        <a class="font-bold serif text-primary-500" href={link}
            ><button class="btn variant-soft text-sm font-bold serif"
                >{$t("i18n.viewMore")}</button
            ></a
        >
    </footer>
</div>
