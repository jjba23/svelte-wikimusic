import type { NonEmptyString } from "io-ts-types";

export interface GetMeQueryResponse {
    identifier: NonEmptyString;
    displayName: NonEmptyString;
    emailAddress: NonEmptyString;
    roles: NonEmptyString[];
}

export const SuperUserRole = "wm::superuser";
export const MaintainerRole = "wm::maintainer";
export const LowRankRole = "wm::lowrank";
export const DemoRole = "wm::demo";
