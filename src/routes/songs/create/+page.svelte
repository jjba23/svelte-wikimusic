<script lang="ts">
    import { handleCreateSongs } from "$lib/api/Song";
    import FormRequiredExplanation from "$lib/components/shared/forms/FormRequiredExplanation.svelte";
    import FormTitle from "$lib/components/shared/forms/FormTitle.svelte";
    import FormSubmitterButton from "$lib/components/shared/buttons/FormSubmitterButton.svelte";
    import TextInput from "$lib/components/shared/forms/TextInput.svelte";
    import { goto } from "$app/navigation";
    import { t } from "$lib/i18n/translation";
    import { toast } from "svelte-sonner";
    import { isNonEmptyString } from "$lib/forms/Util";
    import type { InsertSongsRequestItem } from "../../../domain/Song";

    const handleForm = async (_: Event) => {
        if (!formValid) {
            toast.error("The submitted data in the form was invalid!");
        } else {
            await handleCreateSongs({ songs: [song] });
        }
    };

    const backAction = async () => {
        goto("/", { replaceState: true });
    };

    let song: InsertSongsRequestItem = {
        displayName: "",
        spotifyUrl: null,
        youtubeUrl: null,
        soundcloudUrl: null,
        wikipediaUrl: null,
    };

    $: formValid = isNonEmptyString(song.displayName);
</script>

<div>
    <FormTitle titleContent="Create songs" {backAction} />

    <FormRequiredExplanation />

    <form on:submit|preventDefault={handleForm}>
        <TextInput
            labelContent={$t("i18n.songName")}
            placeholderContent={$t("i18n.enterSongName")}
            isRequired={true}
            bind:value={song.displayName}
        />

        <TextInput
            labelContent={$t("i18n.spotifyUrl")}
            placeholderContent={$t("i18n.enterSpotifyUrl")}
            bind:value={song.spotifyUrl}
        />
        <TextInput
            labelContent={$t("i18n.youtubeUrl")}
            placeholderContent={$t("i18n.enterYoutubeUrl")}
            bind:value={song.youtubeUrl}
        />
        <TextInput
            labelContent={$t("i18n.soundcloudUrl")}
            placeholderContent={$t("i18n.enterSoundcloudUrl")}
            bind:value={song.soundcloudUrl}
        />
        <TextInput
            labelContent={$t("i18n.wikipediaUrl")}
            placeholderContent={$t("i18n.enterWikipediaUrl")}
            bind:value={song.wikipediaUrl}
        />

        <FormSubmitterButton disabled={!formValid} />
    </form>
</div>
