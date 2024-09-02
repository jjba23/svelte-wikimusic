<script>
    import { t } from "$lib/i18n/translation";
</script>

<div class="my-6 flex flex-col align-middle justify-center text-center">
    <button
        class="text-primary-500 font-bold serif"
        on:click={() =>
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            })}>↿ {$t("i18n.clickToGoUp")} ↿</button
    >

    <div class="mt-4">
        {$t("i18n.authorIntro")}
        <a class="text-primary-500 font-bold" href="mailto:jjbigorra@gmail.com"
            >Josep Bigorra</a
        >
    </div>
    <div class="mt-4">
        {$t("i18n.seeJoesWebsite")}
        <a
            class="text-tertiary-500 font-bold"
            href="https://jointhefreeworld.org">jointhefreeworld.org</a
        >
    </div>

    <em class="mt-4 text-sm">
        {$t("i18n.poweredBy")}
    </em>
    <em class="mt-4 text-sm font-bold">
        {$t("i18n.licensedGnuGpl3")}
    </em>
    <small>
        {$t("i18n.wikimusicSourceCodeT1")}
        <a
            class="text-primary-500 font-bold"
            href="https://gitlab.com/jjba-projects/wikimusic-web"
        >
            {$t("i18n.wikimusicSourceCodeT2")}
        </a>
    </small>
</div>
