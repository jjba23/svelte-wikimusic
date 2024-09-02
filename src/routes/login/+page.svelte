<script lang="ts">
    import { handleLogin } from "$lib/api/Auth";
    import FormSubmitterButton from "$lib/components/shared/buttons/FormSubmitterButton.svelte";
    import TextInput from "$lib/components/shared/forms/TextInput.svelte";
    import { isNonEmptyString } from "$lib/forms/Util";
    import { t } from "$lib/i18n/translation";

    const handleForm = async (e: Event) => {
        await handleLogin(loginRequest);
    };

    let loginRequest = {
        wikimusicEmail: "",
        wikimusicPassword: "",
    };

    $: formValid =
        isNonEmptyString(loginRequest.wikimusicEmail) &&
        isNonEmptyString(loginRequest.wikimusicPassword);
</script>

<div>
    <h1 class="h2">{$t("i18n.login")} - WikiMusic</h1>
    <div class="mt-6 w-3/4 md:w-1/2 lg:w-1/2">
        <form on:submit|preventDefault={handleForm}>
            <TextInput
                isRequired={true}
                labelContent={$t("i18n.emailAddress")}
                placeholderContent={$t("i18n.placeholderEmailAddress")}
                bind:value={loginRequest.wikimusicEmail}
            />
            <label class="font-bold">
                {$t("i18n.password")}
                <input
                    type="password"
                    required
                    class="input p-2"
                    placeholder={$t("i18n.placeholderPassword")}
                    bind:value={loginRequest.wikimusicPassword}
                />
            </label>
            <FormSubmitterButton disabled={!formValid} />
        </form>
    </div>
    <p class="mt-6 text-left">
        {$t("i18n.forgotPasswordQ")}
        <a href="/user/reset-password">
            <button class="m-4 btn variant-soft-tertiary font-bold serif"
                >{$t("i18n.resetIt")}</button
            ></a
        >
    </p>
</div>
