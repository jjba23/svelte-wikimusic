<script lang="ts">
    import { activeSongPage } from "$lib/stores/songs";
    import { pipe } from "fp-ts/lib/function";
    import { writable } from "svelte/store";
    import { toEuropeanTimestamp } from "../../../domain/DateTime";
    import type { SongContents } from "../../../domain/Song";
    import CopyButton from "../CopyButton.svelte";

    export let v: SongContents;
    let currentPreSize = writable("text-sm");

    const resizeIframe = () => {
        let iframe = document.getElementById("pdf-iframe");
        if (iframe) {
            iframe.style.height = document.documentElement.scrollHeight + "px";
        }
    };
    const hasFileContent = (str: any) =>
        str != "data:application/octet-stream;base64," && str != "";

    let isScrolling = false;
    let scrollSpeed: number;

    const asciiContentsElId = "asciiContents";

  const recursiveScroll = () => {
    const el = document.getElementById(asciiContentsElId);
    if (isScrolling && (window.scrollY - 600) < el?.scrollHeight) {
      setTimeout(() => {
	window.scrollByLines(scrollSpeed)
	recursiveScroll()
      }, 1000)
    }
  }
  
    const startScrolling = async function() {        
        isScrolling = true;
        location.href = "#";
        location.href = `#${asciiContentsElId}`;
        recursiveScroll()
    };
    const stopScrolling = () => {
        isScrolling = false;
    };
</script>

<svelte:window on:wheel={() => (isScrolling = false)} />

<div class="flex flex-col gap-4">
    <p>
        version identifier: <code class="code">{v.identifier}</code>
        <CopyButton x={v.identifier} />
    </p>
    <p>
        version name: <span class="is-family-monospace">{v.versionName}</span>
    </p>
    <p>created at: {toEuropeanTimestamp(v.createdAt)}</p>

    {#if v.lastEditedAt}
        <p>
            last edited at: {toEuropeanTimestamp(v.lastEditedAt)}
        </p>
    {/if}

    <p>instrument type: <strong>{v.instrumentType}</strong></p>

    <div class="flex flex-row gap-6 align-center justify-center items-center">
        <p>font size:</p>
        <div class="btn-group variant-soft font-bold w-auto">
            <button class="serif" on:click={() => ($currentPreSize = "text-xs")}
                >S</button
            >
            <button class="serif" on:click={() => ($currentPreSize = "text-sm")}
                >M</button
            >
            <button
                class="serif"
                on:click={() => ($currentPreSize = "text-base")}>L</button
            >
        </div>
    </div>

    {#if v.asciiLegend}
        <h5 class="mt-6 h5">ASCII legend:</h5>
        <pre
            class="pre rounded-lg bg-surface-50 text-surface-900 bg-opacity-86 {$currentPreSize}">{v.asciiLegend}</pre>
    {/if}

    <div
        class="mt-4 flex flex-row gap-4 align-center justify-center items-center"
    >
        <div hidden={isScrolling}>
            <button
                class="btn variant-soft font-bold serif"
                on:click={() => startScrolling()}>▶️ Start auto-scroll</button
            >
        </div>
        <div hidden={!isScrolling}>
            <button
                class="btn variant-soft font-bold serif"
                on:click={() => stopScrolling()}>⏸️ Stop auto-scroll</button
            >
        </div>
        <select
            bind:value={scrollSpeed}
            class="serif variant-soft font-bold p-2 rounded-lg text-lg"
        >
            <option value="2">2 lines per second</option>
            <option selected value="4">4 lines per second</option>
            <option value="6">6 lines per second</option>
            <option value="8">8 lines per second</option>
            <option value="10">10 lines per second</option>
            <option value="12">12 lines per second</option>
        </select>
    </div>

    {#if v.asciiContents}
        <h5 class="mt-6 h5">ASCII contents:</h5>
        <pre
            id="asciiContents"
            class="pre rounded-lg bg-surface-50 text-surface-900 bg-opacity-86 {$currentPreSize}">{v.asciiContents}</pre>
    {/if}
    {#if v.pdfContents && hasFileContent(pipe(v.pdfContents))}
        <iframe
            id="pdf-iframe"
            title="pdf contents for {$activeSongPage?.displayName}"
            class="w-full h-auto"
            on:load={() => resizeIframe()}
            src={pipe(v.pdfContents)}
        />
    {/if}
</div>
