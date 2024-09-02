<script lang="ts">
  import { t } from "$lib/i18n/translation";

  export let doSearch = async function(searchVal: string) {}
  export let clearSearch = async function() {searchVal = "";}
  
  const doSearchWithBuffering = async function () {
    console.log(searchVal);
    if (!searchVal || searchVal == "") {
      searchVal = "";
      await clearSearch();
    }else{
        await doSearch(searchVal);
    }
  };

  

  const submitSearchOnEnter = async function (e: KeyboardEvent) {
    if(e?.key == "Enter") {
      e.preventDefault()
      await doSearchWithBuffering()
    }
  }
  
  let searchVal = "";
</script>

<div class="flex justify-center flex-wrap items-center my-5 gap-2">
    <input
        bind:value={searchVal}
        type="search"
        class="input p-2 w-full md:w-1/2"
        on:change={doSearchWithBuffering}
        on:keyup={submitSearchOnEnter}
        placeholder={$t("i18n.searchPlaceholder") + "..."}
    />
    <div class="btn-group variant-soft">
        <button class="text-xl font-bold serif" on:click={doSearchWithBuffering}
            >🔍</button
        >
        <button
            on:click={async function () {
                searchVal = "";
                await clearSearch();
            }}
            type="button"
            class="font-bold serif"
        >
            ❌</button
        >
    </div>
</div>
