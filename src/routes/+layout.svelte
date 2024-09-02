<script lang="ts">
    import Footer from "$lib/components/Footer.svelte";
    import Navigation from "$lib/components/Navigation.svelte";
    import { t } from "$lib/i18n/translation";
    import {
        AppBar,
        AppShell,
        Drawer,
        getDrawerStore,
        initializeStores,
        setInitialClassState,
    } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";
    import { Toaster } from "svelte-sonner";
    import { quintOut } from "svelte/easing";
    import { slide } from "svelte/transition";
    import "../app.css";

    initializeStores();

    const drawerStore = getDrawerStore();

    function drawerOpen(): void {
        drawerStore.open({});
    }

    onMount(() => {
        setInitialClassState();
    });
</script>

<Drawer>
    <h2 class="h3 p-4">♪ WikiMusic</h2>
    <hr />
    <Navigation />
</Drawer>

<AppShell slotSidebarLeft="bg-surface-500/5 w-0 lg:w-64">
    <svelte:fragment slot="header">
        <AppBar class="bg-opacity-20">
            <svelte:fragment slot="lead">
                <div class="flex items-center">
                    <button
                        class="lg:hidden btn btn-sm mr-4 serif"
                        on:click={drawerOpen}
                    >
                        <span>
                            <svg
                                viewBox="0 0 100 80"
                                class="fill-token w-4 h-4"
                            >
                                <rect width="100" height="20" />
                                <rect y="30" width="100" height="20" />
                                <rect y="60" width="100" height="20" />
                            </svg>
                        </span>
                    </button>
                    <a href="/"> <h2 class="h3">♪ WikiMusic</h2></a>
                </div>
            </svelte:fragment>
            <svelte:fragment slot="headline" />
        </AppBar>
    </svelte:fragment>
    <svelte:fragment slot="pageHeader">
        <div class="flex justify-center items-center">
            <em class="my-4">{$t("i18n.slogan1")}</em>
        </div>
        <Toaster
            richColors
            position="top-right"
            closeButton
            toastOptions={{ class: "text-xl" }}
        />
    </svelte:fragment>
    <svelte:fragment slot="sidebarLeft">
        <Navigation />
    </svelte:fragment>
    <div
        class="p-4"
        transition:slide={{
            delay: 100,
            duration: 300,
            easing: quintOut,
            axis: "x",
        }}
    >
        <slot />
    </div>
    <svelte:fragment slot="footer">
        <Footer />
    </svelte:fragment>
</AppShell>
