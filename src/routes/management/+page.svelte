<script lang="ts">
    import AddEntityButton from "$lib/components/shared/buttons/AddEntityButton.svelte";
    import { t } from "$lib/i18n/translation";
    import {
        isAtLeastDemo,
        isAtLeastLowRank,
        isAtLeastSuperUser,
        isOnlyDemo,
        meStore,
    } from "$lib/stores/auth";
    import { systemInformation } from "$lib/stores/ui";
    import { toEuropeanTimestamp } from "../../domain/DateTime";
</script>

<div class="flex flex-col gap-8">
    <h1 class="h2 capitalize">{$t("i18n.management")}</h1>

    <div hidden={!isOnlyDemo($meStore?.roles)}>
        <strong>Management section is restricted for "Demo" users.</strong>
        <p>
            To manage songs, artists, genres and more, you need to be "Low
            Rank", "Maintainer" or "SuperUser"
        </p>
    </div>

    <div hidden={!isAtLeastLowRank($meStore?.roles)}>
        <h3 class="my-6 h3">Contribute with knowledge</h3>
        <div
            class="my-4 flex flex-row flex-wrap gap-4 justify-left items-center"
        >
            <AddEntityButton buttonLink="/songs/create" buttonText="add song" />
            <AddEntityButton
                buttonLink="/artists/create"
                buttonText="add artist"
            />
            <AddEntityButton
                buttonLink="/genres/create"
                buttonText="add genres"
            />
        </div>
    </div>

    <div hidden={!isAtLeastSuperUser($meStore?.roles)}>
        <hr />
        <h3 class="my-6 h3">Superuser section</h3>
        <div class="flex flex-row flex-wrap gap-4 justify-left items-center">
            <AddEntityButton
                buttonLink="/user/invite"
                buttonText="invite user"
                cls="variant-soft-warning"
            />
            <AddEntityButton
                buttonLink="/user/delete"
                buttonText="delete user"
                cls="variant-soft-error"
            />
        </div>
    </div>

    <div hidden={!isAtLeastDemo($meStore?.roles)}>
        <hr />
        <h3 class="my-6 h3">System Information</h3>
        <table class="table table-hover table-compact">
            <tbody>
                <tr
                    ><th>version:</th><td
                        ><code class="text-lg"
                            >{$systemInformation?.reportedVersion}</code
                        ></td
                    ></tr
                >
                <tr
                    ><th>backend started:</th><td
                        ><code class="text-lg"
                            >{toEuropeanTimestamp(
                                Date.parse($systemInformation?.processStartedAt)
                            )}</code
                        ></td
                    ></tr
                >
            </tbody>
        </table>
    </div>
</div>
