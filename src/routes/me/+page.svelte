<script lang="ts">
    import { t } from "$lib/i18n/translation";
    import { meStore } from "$lib/stores/auth";
</script>

<h1 class="h2">{$t("i18n.myProfile")}</h1>
<div class="container mt-6 flex flex-col table-container">
    <table class="table table-hover table-compact">
        <tbody>
            <tr>
                <th>identifier:</th><td
                    ><span
                        ><code class="code text-lg">{$meStore?.identifier}</code
                        ></span
                    ></td
                >
            </tr>
            <tr>
                <th>display name:</th><td
                    ><span class="text-lg">{$meStore?.displayName}</span></td
                >
            </tr>
            <tr>
                <th>email:</th><td
                    ><span class="text-lg">{$meStore?.emailAddress}</span></td
                >
            </tr>
            <tr>
                <th>roles:</th><td>
                    <code class="code text-lg">{$meStore?.roles ?? []}</code
                    ></td
                >
            </tr>
        </tbody>
    </table>
    <p class="mt-6">
        {$t("i18n.forgotPasswordQ")}
        <a href="/user/reset-password">
            <button class="m-4 btn variant-soft-tertiary font-bold serif"
                >{$t("i18n.resetIt")}</button
            ></a
        >
    </p>
</div>
