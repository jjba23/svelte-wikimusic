<script lang="ts">
    import { t } from "$lib/i18n/translation";
    import {
        isAtLeastLowRank,
        isAtLeastMaintainer,
        meStore,
    } from "$lib/stores/auth";
    export let handleLike: (e: any) => Promise<void>;
    export let handleDislike: (e: any) => Promise<void>;
    export let handleDelete: (e: any) => Promise<void>;
    export let handleEdit: (e: any) => Promise<void>;
</script>

<div class="flex flex-wrap flex-row">
    <button
        on:click|preventDefault={handleLike}
        type="button"
        class="m-2 btn variant-soft-success font-bold serif"
        >😀 {$t("i18n.like")}</button
    >
    <button
        on:click|preventDefault={handleDislike}
        type="button"
        class="m-2 btn variant-soft-warning font-bold serif"
        >😢 {$t("i18n.dislike")}</button
    >
    <div hidden={!isAtLeastMaintainer($meStore?.roles)}>
        <button
            on:click|preventDefault={handleDelete}
            type="button"
            class="m-2 btn variant-soft-error font-bold serif"
            >🗑️ {$t("i18n.delete")}</button
        >
    </div>

    <div hidden={!isAtLeastLowRank($meStore?.roles)}>
        <button
            on:click|preventDefault={handleEdit}
            type="button"
            class="m-2 btn variant-soft-tertiary font-bold serif"
            >✏️ {$t("i18n.edit")}</button
        >
    </div>
</div>
