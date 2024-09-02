<script lang="ts">
    import { t } from "$lib/i18n/translation";
    import { clipboard } from "@skeletonlabs/skeleton";
    import { toast } from "svelte-sonner";

    export let x: string = "";
</script>

<button
    class="mx-3 btn variant-soft text-xs serif"
    use:clipboard={x}
    on:click={() => toast.success($t("i18n.copiedToClipboard"))}
    >📋 {$t("i18n.copy")}</button
>
