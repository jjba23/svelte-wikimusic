import { goto } from "$app/navigation";
import { PUBLIC_API_URL } from "$env/static/public";
import { toast } from "svelte-sonner";

const apiUrl = "https://api.wikimusic.jointhefreeworld.org";

export const buildApiUrl = (path: string) => {
    let envApiUrl = PUBLIC_API_URL;
    if (envApiUrl) {
        return `${envApiUrl}${path}`;
    } else {
        return `${apiUrl}${path}`;
    }
};

export function doReqWithHandling(
    successMessage: string | undefined,
    eff: any,
    goDestination: string | undefined = undefined,
) {
    try {
        eff();

        if (successMessage !== "" && successMessage !== undefined) {
            toast.success(successMessage);
        }

        if (goDestination) {
            goto(goDestination, { replaceState: true });
        }
    } catch (err: any) {
        console.log(err);
        toast.error(err);

        if (goDestination) {
            goto(goDestination, { replaceState: true });
        }
    }
}
