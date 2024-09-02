<script lang="ts">
    import { handleCreateSongContents } from "$lib/api/Song";
    import {
        getFileBase64OrIfEmptyUndefined,
        isNonEmptyString,
    } from "$lib/forms/Util";
    import type { InsertSongContentsItem } from "../../../domain/Song";
    import FormSubmitterButton from "../shared/buttons/FormSubmitterButton.svelte";
    import FileInput from "../shared/forms/FileInput.svelte";
    import TextArea from "../shared/forms/TextArea.svelte";
    import TextInput from "../shared/forms/TextInput.svelte";

    export let songIdentifier: string;

    let addSongContent: InsertSongContentsItem = {
        songIdentifier: songIdentifier,
        versionName: "",
        instrumentType: null,
        asciiLegend: null,
        asciiContents: null,
        pdfContents: null,
        guitarProContents: null,
    };

    let pdfFile: any;
    let gp5File: any;

    const handleCreateSongContentsForm = async (e: Event) => {
        let pdf = await getFileBase64OrIfEmptyUndefined(
            "pdfFile",
            new FormData(e.target)
        );
        let gp5 = await getFileBase64OrIfEmptyUndefined(
            "gp5File",
            new FormData(e.target)
        );

        // TODO remove mutation
        addSongContent.pdfContents = pdf;
        addSongContent.guitarProContents = gp5;
        await handleCreateSongContents(
            { songContents: [addSongContent] },
            songIdentifier
        );
    };

    $: formValid =
        isNonEmptyString(addSongContent.versionName) &&
        isNonEmptyString(addSongContent.instrumentType);
</script>

<div>
    <h4 class="mt-4 h4">Create version</h4>

    <form on:submit|preventDefault={handleCreateSongContentsForm}>
        <TextInput
            labelContent="Version name"
            isRequired={true}
            bind:value={addSongContent.versionName}
        />
        <TextInput
            labelContent="Instrument type"
            isRequired={true}
            bind:value={addSongContent.instrumentType}
        />
        <TextArea
            labelContent="ASCII legend"
            classes="textarea min-h-[240px] font-mono"
            bind:value={addSongContent.asciiLegend}
        />
        <TextArea
            labelContent="ASCII contents"
            classes="textarea min-h-[440px] font-mono"
            bind:value={addSongContent.asciiContents}
        />
        <FileInput labelContent="PDF file" fieldIdentifier="pdfFile" />
        <FileInput labelContent="GuitarPro file" fieldIdentifier="gp5File" />
        <FormSubmitterButton disabled={!formValid} />
    </form>
</div>
