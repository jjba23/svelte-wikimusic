<script lang="ts">
    import TextInput from "$lib/components/shared/forms/TextInput.svelte";
    import FormSubmitterButton from "$lib/components/shared/buttons/FormSubmitterButton.svelte";
    import { handleCreateArtists } from "$lib/api/Artist";
    import FormTitle from "$lib/components/shared/forms/FormTitle.svelte";
    import FormRequiredExplanation from "$lib/components/shared/forms/FormRequiredExplanation.svelte";
    import { goto } from "$app/navigation";

    import { t } from "$lib/i18n/translation";
    import type { InsertArtistsRequestItem } from "../../../domain/Artist";

    import { isNonEmptyString } from "$lib/forms/Util";
    import { toast } from "svelte-sonner";

    const handleForm = async (e: Event) => {
        if (!formValid) {
            toast.error("The submitted data in the form was invalid!");
        } else {
            await handleCreateArtists({ artists: [artist] });
        }
    };

    const backAction = async (e: any) => {
        goto("/artists", { replaceState: true });
    };

    let artist: InsertArtistsRequestItem = {
        displayName: "",
        spotifyUrl: null,
        youtubeUrl: null,
        wikipediaUrl: null,
        soundcloudUrl: null,
    };

    $: formValid = isNonEmptyString(artist.displayName);
</script>

<svelte:head>
    <title>{$t("i18n.createArtist")}&nbsp;{$t("i18n.onWikiMusic")}</title>
</svelte:head>

<div>
    <FormTitle
        titleContent={$t("i18n.createArtist") + " " + $t("i18n.onWikiMusic")}
        {backAction}
    />

    <FormRequiredExplanation />

    <form on:submit|preventDefault={handleForm}>
        <TextInput
            labelContent="display name"
            isRequired={true}
            placeholderContent="Enter the name of the artist"
            bind:value={artist.displayName}
        />
        <TextInput
            labelContent="spotify URL"
            placeholderContent="Enter the Spotify URL"
            bind:value={artist.spotifyUrl}
        />
        <TextInput
            labelContent="youtube URL"
            placeholderContent="Enter the Youtube URL"
            bind:value={artist.youtubeUrl}
        />
        <TextInput
            labelContent="soundcloud URL"
            placeholderContent="Enter the Soundcloud URL"
            bind:value={artist.soundcloudUrl}
        />
        <TextInput
            labelContent="wikipedia URL"
            placeholderContent="Enter the Wikipedia URL"
            bind:value={artist.wikipediaUrl}
        />
        <FormSubmitterButton disabled={!formValid} />
    </form>
</div>
