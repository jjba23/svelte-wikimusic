import ky from "ky";
import { buildApiUrl, doReqWithHandling } from "./Shared";

export const handleResetPassword = async (r: { userEmail: string }) => {
    doReqWithHandling(
        "Requested password reset successfully! Check your e-mail inbox!",
        async function () {
            await ky.post(buildApiUrl(`/reset-password/email/${r.userEmail}`), {
                credentials: "include",
            });
        },
        "/login",
    );
};

export const handleDoResetPassword = async (r: {
    token: string;
    email: string;
    pass: string;
    repeatPass: string;
}) => {
    doReqWithHandling(
        "Performed password reset",
        async function () {
            await ky.post(buildApiUrl(`/reset-password/do`), {
                credentials: "include",
                json: r,
            });
        },
        "/login",
    );
};

export const handleInviteUser = async (r: {
    email: string;
    displayName: string;
    role: string;
}) => {
    doReqWithHandling("Invited user!", async function () {
        await ky
            .post(buildApiUrl(`/users/invite`), {
                credentials: "include",
                json: r,
            })
            .catch((e) => console.log(e));
    });
};

export const handleDeleteUser = async (r: { email: string }) => {
    doReqWithHandling("Delete user!", async function () {
        await ky.post(buildApiUrl(`/users/delete`), {
            credentials: "include",
            json: r,
        });
    });
};
