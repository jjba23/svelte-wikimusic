<script lang="ts">
    import { goto } from "$app/navigation";
    import { t } from "$lib/i18n/translation";
    export let sortOrderChoices: Map<string, string>;

    const onChangeSortOrder = (e: any) => {
        let href = e.target.value;
        goto(href, { replaceState: true });
    };
    const ofLocalizationKey = (k: String) => {
        if (k == "display_name_desc") {
            return $t("i18n.displayNameDesc");
        } else if (k == "created_at_asc") {
            return $t("i18n.createdAtAsc");
        } else if (k == "created_at_desc") {
            return $t("i18n.createdAtDesc");
        } else {
            return $t("i18n.displayNameAsc");
        }
    };
</script>

<select
    class="variant-soft font-bold mx-4 p-2 rounded-lg"
    on:change={onChangeSortOrder}
>
    {#each sortOrderChoices as [k, v]}
        <option value={v}>{ofLocalizationKey(k)}</option>
    {/each}
</select>
