<script lang="ts">
    import type { NonEmptyString } from "io-ts-types";
    import { toEuropeanTimestamp } from "../../../domain/DateTime";
    import type { ThreadRender } from "../../../domain/Thread";
    import CommentPlacer from "./CommentPlacer.svelte";

    export let identifier: NonEmptyString;
    export let identifierFieldName: string;
    export let entityIdentifier: NonEmptyString;
    export let contents: NonEmptyString;
    export let createdBy: NonEmptyString;
    export let createdAt: Date;
    export let indentedAmount: number = 0;
    export let handler: (e: any) => Promise<void>;

    interface MyData {
        identifier: NonEmptyString;
        contents: NonEmptyString;
        createdBy: NonEmptyString;
        createdAt: Date;
    }

    export let subNodes: ThreadRender<MyData>[] = [];

    let showCommentPlacer = false;
</script>

<div
    id={identifier}
    style="margin-left: {indentedAmount}px;"
    class="card variant-soft p-4 my-4"
>
    <section class="p-4"><p class="text-lg">{contents}</p></section>
    <footer class="card-footer">
        <button
            class="btn variant-soft text-sm serif"
            on:click={(e) => (showCommentPlacer = !showCommentPlacer)}
            >reply
        </button>
        <div class="my-2">
            <small class="">{createdBy}</small>
            <small class="mx-2">@</small>
            <small class="">{toEuropeanTimestamp(createdAt)}</small>
        </div>
    </footer>

    {#if showCommentPlacer}
        <CommentPlacer
            identifier={entityIdentifier}
            {identifierFieldName}
            parentIdentifier={identifier}
            {handler}
        />
    {/if}
</div>

{#each subNodes as subNode}
    <svelte:self
        identifier={subNode.node.identifier}
        {identifierFieldName}
        {entityIdentifier}
        contents={subNode.node.contents}
        createdBy={subNode.node.createdBy}
        createdAt={subNode.node.createdAt}
        indentedAmount={indentedAmount < 256
            ? indentedAmount + 32
            : indentedAmount}
        {handler}
        subNodes={subNode.subNodes}
    />
{/each}
