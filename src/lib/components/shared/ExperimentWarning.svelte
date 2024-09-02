<script lang="ts">
    export let textContent: string;
    export let isHidden: boolean = false;
</script>

<div hidden={isHidden} class="notification is-warning is-light serif">
    <button
        class="delete serif"
        on:click={(e) => {
            isHidden = !isHidden;
        }}
    />
    {textContent}
</div>
