import { goto } from "$app/navigation";
import { systemInformation } from "$lib/stores/ui";
import ky from "ky";
import type { SystemInformation } from "../../domain/SystemInformation";
import { buildApiUrl, doReqWithHandling } from "./Shared";


export const fetchSystemInformationToStore = async () => {
	doReqWithHandling(undefined, async function() {
		try {
			const res: SystemInformation = await ky(buildApiUrl("/system-information"), {
				credentials: "include",
			}).json();
			systemInformation.set(res);
		} catch (e: any) {
			goto("/login");
		}
	});
};
