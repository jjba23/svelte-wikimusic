<script lang="ts">
    import TextInput from "$lib/components/shared/forms/TextInput.svelte";
    import FormSubmitterButton from "$lib/components/shared/buttons/FormSubmitterButton.svelte";
    import { handleResetPassword } from "$lib/api/User";
    import { t } from "$lib/i18n/translation";
    import EmailInput from "$lib/components/shared/forms/EmailInput.svelte";

    const handleForm = async (e: Event) => {
        await handleResetPassword({
            userEmail: email,
        });
    };

    let email = "";
</script>

<div>
    <h1 class="h2">{$t("i18n.resetPassword")}</h1>
    <form class="mt-6" on:submit|preventDefault={handleForm}>
        <EmailInput
            labelContent="E-mail address"
            isRequired={true}
            placeholderContent="Enter your e-mail address"
            bind:value={email}
        />
        <FormSubmitterButton />
    </form>
</div>
