<script lang="ts">
    import { handleCreateGenres } from "$lib/api/Genre";
    import FormRequiredExplanation from "$lib/components/shared/forms/FormRequiredExplanation.svelte";
    import FormTitle from "$lib/components/shared/forms/FormTitle.svelte";
    import FormSubmitterButton from "$lib/components/shared/buttons/FormSubmitterButton.svelte";
    import TextInput from "$lib/components/shared/forms/TextInput.svelte";
    import { goto } from "$app/navigation";
    import type { InsertGenreRequestItem } from "../../../domain/Genre";
    import { isNonEmptyString } from "$lib/forms/Util";
    import { t } from "$lib/i18n/translation";
    import { toast } from "svelte-sonner";

    const handleForm = async (e: Event) => {
        if (!formValid) {
            toast.error("The submitted data in the form was invalid!");
        } else {
            await handleCreateGenres({ genres: [genre] });
        }
    };

    const backAction = async (e: any) => {
        goto("/genres", { replaceState: true });
    };

    let genre: InsertGenreRequestItem = {
        displayName: "",
        spotifyUrl: null,
        youtubeUrl: null,
        soundcloudUrl: null,
        wikipediaUrl: null,
    };

    $: formValid = isNonEmptyString(genre.displayName);
</script>

<svelte:head>
    <title>{$t("i18n.createGenre")}&nbsp;{$t("i18n.onWikiMusic")}</title>
</svelte:head>

<div>
    <FormTitle titleContent="Create genres" {backAction} />
    <FormRequiredExplanation />

    <form on:submit|preventDefault={handleForm}>
        <TextInput
            labelContent={$t("i18n.genreName")}
            placeholderContent={$t("i18n.enterGenreName")}
            isRequired={true}
            bind:value={genre.displayName}
        />

        <TextInput
            labelContent={$t("i18n.spotifyUrl")}
            placeholderContent={$t("i18n.enterSpotifyUrl")}
            bind:value={genre.spotifyUrl}
        />
        <TextInput
            labelContent={$t("i18n.youtubeUrl")}
            placeholderContent={$t("i18n.enterYoutubeUrl")}
            bind:value={genre.youtubeUrl}
        />
        <TextInput
            labelContent={$t("i18n.soundcloudUrl")}
            placeholderContent={$t("i18n.enterSoundcloudUrl")}
            bind:value={genre.soundcloudUrl}
        />
        <TextInput
            labelContent={$t("i18n.wikipediaUrl")}
            placeholderContent={$t("i18n.enterWikipediaUrl")}
            bind:value={genre.wikipediaUrl}
        />

        <FormSubmitterButton disabled={!formValid} />
    </form>
</div>
