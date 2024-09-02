import { goto } from "$app/navigation";
import { meStore } from "$lib/stores/auth";
import ky from "ky";
import type { GetMeQueryResponse } from "../../domain/Auth";
import { DisplayNameAsc } from "../../domain/Sorting";
import { buildApiUrl, doReqWithHandling } from "./Shared";
import { fetchSongsToStore } from "./Song";

export const handleLogin = async (r: any) => {
    doReqWithHandling(
        "Logged in!",
        async function () {
            await ky.post(buildApiUrl("/login"), {
                credentials: "include",
                json: r,
            });
            await fetchMeToStore();
            setTimeout(async function () {
                await fetchSongsToStore(DisplayNameAsc);
                goto("/");
            }, 200);
        },
        "/",
    );
};

export const fetchMeToStore = async () => {
    doReqWithHandling(undefined, async function () {
        try {
            const res: GetMeQueryResponse = await ky(buildApiUrl("/me"), {
                credentials: "include",
            }).json();
            meStore.set(res);
        } catch (e: any) {
            goto("/login");
        }
    });
};
