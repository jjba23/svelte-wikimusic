<script lang="ts">
    import TextInput from "$lib/components/shared/forms/TextInput.svelte";
    import FormSubmitterButton from "$lib/components/shared/buttons/FormSubmitterButton.svelte";
    import { handleDoResetPassword } from "$lib/api/User";
    import { page } from "$app/stores";
    import PassInput from "$lib/components/shared/forms/PassInput.svelte";
    import EmailInput from "$lib/components/shared/forms/EmailInput.svelte";
    import { isNonEmptyString } from "$lib/forms/Util";

    const handleForm = async (e: Event) => {
        await handleDoResetPassword(passReset);
    };

    let passReset = {
        token: $page.url.searchParams.get("token") ?? "",
        email: "",
        pass: "",
        repeatPass: "",
    };

    $: formValid =
        isNonEmptyString(passReset.email) &&
        isNonEmptyString(passReset.token) &&
        isNonEmptyString(passReset.pass) &&
        passReset.pass == passReset.repeatPass;
</script>

<div>
    <h1 class="h2">Reset your password</h1>
    <form class="my-4" on:submit|preventDefault={handleForm}>
        <EmailInput
            labelContent="email address"
            isRequired={true}
            placeholderContent="Enter your e-mail address"
            bind:value={passReset.email}
        />
        <PassInput
            isRequired={true}
            labelContent="password"
            placeholderContent="Enter your password"
            bind:value={passReset.pass}
        />
        <PassInput
            isRequired={true}
            labelContent="password confirmation"
            placeholderContent="Confirm your password"
            bind:value={passReset.repeatPass}
        />
        <FormSubmitterButton disabled={!formValid} />
    </form>
</div>
