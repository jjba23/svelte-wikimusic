<script lang="ts">
    import FormSubmitterButton from "./buttons/FormSubmitterButton.svelte";

    export let identifier: string;
    export let identifierFieldName: string;
    export let parentIdentifier: string | undefined;
    export let handler: (e: any) => Promise<void>;
</script>

<form on:submit|preventDefault={handler} class="mb-6">
    <input name={identifierFieldName} hidden value={identifier} />
    {#if parentIdentifier}
        <input name="parentIdentifier" hidden value={parentIdentifier} />
    {/if}

    <textarea
        placeholder="Enter your comment..."
        maxlength="8200"
        class="textarea p-4 rounded-xl min-h-[240px]"
        name="contents"
        required
    />
    <em class="text">max 8200 char</em>
    <FormSubmitterButton />
</form>
