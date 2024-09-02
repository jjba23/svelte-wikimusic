import { writable, type Writable } from "svelte/store";
import {
    DemoRole,
    LowRankRole,
    MaintainerRole,
    SuperUserRole,
    type GetMeQueryResponse,
} from "../../domain/Auth";

export const meStore: Writable<GetMeQueryResponse | undefined> =
    writable(undefined);

export const isAtLeastSuperUser = (roles: string[] | undefined) => {
    if (!roles) {
        return false;
    } else {
        return roles.find((x) => x == SuperUserRole) !== undefined;
    }
};

export const isAtLeastMaintainer = (roles: string[] | undefined) => {
    if (!roles) {
        return false;
    } else {
        return (
            roles.find((x) => x == MaintainerRole) !== undefined ||
            roles.find((x) => x == SuperUserRole) !== undefined
        );
    }
};

export const isAtLeastLowRank = (roles: string[] | undefined) => {
    if (!roles) {
        return false;
    } else {
        return (
            roles.find((x) => x == LowRankRole) !== undefined ||
            roles.find((x) => x == MaintainerRole) !== undefined ||
            roles.find((x) => x == SuperUserRole) !== undefined
        );
    }
};

export const isAtLeastDemo = (roles: string[] | undefined) => {
    if (!roles) {
        return false;
    } else {
        return (
            roles.find((x) => x == DemoRole) !== undefined ||
            roles.find((x) => x == LowRankRole) !== undefined ||
            roles.find((x) => x == MaintainerRole) !== undefined ||
            roles.find((x) => x == SuperUserRole) !== undefined
        );
    }
};

export const isOnlyDemo = (roles: string[] | undefined) => {
    if (!roles) {
        return false;
    } else {
        return (
            roles.find((x) => x == DemoRole) !== undefined &&
            roles.find((x) => x == LowRankRole) === undefined &&
            roles.find((x) => x == MaintainerRole) === undefined &&
            roles.find((x) => x == SuperUserRole) === undefined
        );
    }
};
