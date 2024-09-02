<script lang="ts">
    export let labelContent: string | null;
    export let isRequired: boolean = false;
    export let placeholderContent: string | null = null;
    export let minValue: any = null;
    export let isHidden: boolean = false;
    export let classes = "input p-2";
    export let value: string | null = "";

    let asteriskContent = " *";
    if (!isRequired) {
        asteriskContent = "";
    }
</script>

<div hidden={isHidden} class="my-4">
    <label class="label font-semibold"
        >{labelContent}<span class="text-error-500">{asteriskContent}</span>
        <input
            required={isRequired}
            class="{classes} font-normal"
            placeholder={placeholderContent}
            bind:value
            min={minValue}
        />
    </label>
</div>
