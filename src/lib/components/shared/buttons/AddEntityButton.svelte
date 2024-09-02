<script lang="ts">
    export let buttonLink: string;
    export let buttonText: string;
    export let cls = "variant-soft-tertiary";
</script>

<a href={buttonLink}>
    <button class="btn {cls} font-bold serif">
        + {buttonText}
    </button>
</a>
