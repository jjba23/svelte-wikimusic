<script lang="ts">
    import BuyCoffeeButton from "$lib/components/shared/buttons/BuyCoffeeButton.svelte";
    import { t } from "$lib/i18n/translation";
</script>

<div>
    <h1 class="h2">{$t("i18n.aboutWikiMusic")}</h1>
    <div class="mt-4 content has-text-justified is-size-5">
        <p>
            {$t("i18n.aboutWikiMusicBody1")}
        </p>

        <p class="mt-4">
            {$t("i18n.joeIs1")}
        </p>

        <p class="mt-4">
            In order to maintain WikiMusic alive and well, and actively being
            developed, please consider <a
                class="text-error-500 font-bold"
                href="https://bmc.link/jjbigorra">{$t("i18n.donate1")}</a
            >.
        </p>

        <p class="mt-4">
            We are a closed community that maintains a data set of very detailed
            information about music, genres, artists, tablatures, music sheets
            and a private forum as well.
        </p>
        <p class="mt-6 has-text-centered"><BuyCoffeeButton /></p>
    </div>
</div>
