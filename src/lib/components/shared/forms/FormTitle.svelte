<script lang="ts">
    import { t } from "$lib/i18n/translation";

    export let titleContent: string;
    export let backAction: any = undefined;
</script>

{#if backAction}
    <div
        class="mb-4 has-cursor-pointer"
        on:click={backAction}
        on:keypress={backAction}
        aria-roledescription="back"
        role="button"
        tabindex="0"
    >
        &lt;&nbsp;&nbsp;
        <span class="subtitle is-6">{$t("i18n.back")} </span>
    </div>
{/if}

<h1 class="h2">{titleContent}</h1>
