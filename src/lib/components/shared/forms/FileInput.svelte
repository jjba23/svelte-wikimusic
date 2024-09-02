<script lang="ts">
    export let labelContent: string | null;
    export let isRequired: boolean = false;
    export let isHidden: boolean = false;
    export let classes = "input p-2";
    export let fieldIdentifier: string;

    let asteriskContent = " *";
    if (!isRequired) {
        asteriskContent = "";
    }
</script>

<div hidden={isHidden} class="my-4">
    <label class="label font-semibold"
        >{labelContent}<span class="text-error-500">{asteriskContent}</span>
        <input
            name={fieldIdentifier}
            type="file"
            required={isRequired}
            class="{classes} font-normal"
        />
    </label>
</div>
