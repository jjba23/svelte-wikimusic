<script lang="ts">
    import TextInput from "$lib/components/shared/forms/TextInput.svelte";
    import FormSubmitterButton from "$lib/components/shared/buttons/FormSubmitterButton.svelte";
    import { handleDeleteUser } from "$lib/api/User";
    import { t } from "$lib/i18n/translation";
    import EmailInput from "$lib/components/shared/forms/EmailInput.svelte";

    const handleForm = async (e: Event) => {
        await handleDeleteUser({ email: email });
    };
    let email = "";
</script>

<div>
    <h1 class="h2">Delete user</h1>
    <form class="mt-6" on:submit|preventDefault={handleForm}>
        <EmailInput
            labelContent="E-mail address:"
            isRequired={true}
            placeholderContent="Enter the user's e-mail address"
            bind:value={email}
        />
        <FormSubmitterButton />
    </form>
</div>
