<script lang="ts">
    export let labelContent: string;
    export let isRequired: boolean = false;
    export let placeholderContent: string | undefined = undefined;
    export let classes: string = "textarea min-h-[240px]";
    export let value: any = "";
    let asteriskContent = " *";
    if (!isRequired) {
        asteriskContent = "";
    }
</script>

<div>
    <label class="label font-semibold"
        >{labelContent}<span class="has-text-error">{asteriskContent}</span>

        <textarea
            required={isRequired}
            class="{classes} font-normal"
            placeholder={placeholderContent}
            bind:value
        />
    </label>
</div>
