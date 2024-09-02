<script lang="ts">
    export let likesNumber: number;
    export let dislikesNumber: number;
    export let verbose: boolean = false;
    const getDislikesText = (verbose: boolean) => {
        if (verbose) {
            return "dislikes";
        } else {
            return "";
        }
    };
    const getLikesText = (verbose: boolean) => {
        if (verbose) {
            return "likes";
        } else {
            return "";
        }
    };
</script>

<div class="serif">
    <span class="font-bold text-success-600">
        {likesNumber}
        {getLikesText(verbose)}
    </span>
    <span class="ml-4 font-bold text-error-600">
        {dislikesNumber}
        {getDislikesText(verbose)}
    </span>
</div>
