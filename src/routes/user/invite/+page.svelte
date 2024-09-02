<script lang="ts">
    import TextInput from "$lib/components/shared/forms/TextInput.svelte";
    import FormSubmitterButton from "$lib/components/shared/buttons/FormSubmitterButton.svelte";
    import { handleInviteUser } from "$lib/api/User";
    import { t } from "$lib/i18n/translation";
    import EmailInput from "$lib/components/shared/forms/EmailInput.svelte";

    const handleForm = async (e: Event) => {
        await handleInviteUser(invite);
    };

    let invite = { email: "", displayName: "", role: "wm::demo" };
</script>

<div>
    <h1 class="h2">Invite user</h1>
    <form class="mt-6" on:submit|preventDefault={handleForm}>
        <EmailInput
            labelContent="E-mail address:"
            isRequired={true}
            placeholderContent="Enter the user's e-mail address"
            bind:value={invite.email}
        />
        <TextInput
            labelContent="Display name:"
            isRequired={true}
            placeholderContent="Enter the user's name"
            bind:value={invite.displayName}
        />

        <div class="my-4">
            <label for="role">New user's role:</label>
            <select
                bind:value={invite.role}
                name="role"
                class="variant-soft font-bold p-2 rounded-lg"
            >
                <option selected value="wm::demo">Demo</option>
                <option value="wm::lowrank">LowRank</option>
                <option value="wm::maintainer">Maintainer</option>
                <option value="wm::superuser">SuperUser</option>
            </select>
        </div>
        <FormSubmitterButton />
    </form>
</div>
