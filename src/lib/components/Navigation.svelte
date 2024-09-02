<script lang="ts">
    import { t } from "$lib/i18n/translation";
    import { meStore } from "$lib/stores/auth";
    import { LightSwitch, getDrawerStore } from "@skeletonlabs/skeleton";
    import LocaleButton from "./shared/buttons/LocaleButton.svelte";

    const drawerStore = getDrawerStore();

    function drawerClose(): void {
        drawerStore.close();
    }
</script>

<nav class="list-nav p-4" aria-label="main navigation">
    <ul class="font-semibold">
        {#if $meStore}
            <li>
                <a class="capitalize" href="/" on:click={drawerClose}>
                    🎵 {$t("i18n.songs")}
                </a>
            </li>
            <li>
                <a class="capitalize" href="/artists" on:click={drawerClose}>
                    ⭐ {$t("i18n.artists")}
                </a>
            </li>
            <li>
                <a class="capitalize" href="/genres" on:click={drawerClose}>
                    💽 {$t("i18n.genres")}
                </a>
            </li>
        {/if}

        {#if $meStore}
            <li>
                <a class="capitalize" href="/me" on:click={drawerClose}
                    ># {$t("i18n.myProfile")}</a
                >
            </li>
            <li>
                <a class="capitalize" href="/management" on:click={drawerClose}>
                    <span class="lowercase mr-2">λ </span>
                    {$t("i18n.management")}
                </a>
            </li>
        {:else}
            <li>
                <a class="capitalize" href="/login" on:click={drawerClose}
                    >➡️ {$t("i18n.login")}</a
                >
            </li>
        {/if}

        <li><LocaleButton /></li>
        <li>
            <!-- svelte-ignore a11y-invalid-attribute -->
            <a class="capitalize" href="#"
                >{$t("i18n.uiMode")}
                <span class="ml-4"><LightSwitch /></span></a
            >
        </li>
        <li>
            <a class="capitalize" href="/about" on:click={drawerClose}>
                ? {$t("i18n.about")}
            </a>
        </li>
    </ul>
</nav>
