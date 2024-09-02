<script lang="ts">
    import { t } from "$lib/i18n/translation";
    export let disabled: boolean = false;
</script>

<div>
    <button
        {disabled}
        type="submit"
        class="mt-6 btn variant-filled-success font-bold serif"
        >✓ {$t("i18n.submit")}</button
    >
</div>
