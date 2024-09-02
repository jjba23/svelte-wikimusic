import { getOrIfEmptyUndefined } from "$lib/forms/Util";
import { activeArtistPage, artistsHomePageItems } from "$lib/stores/artists";
import ky from "ky";
import type {
    Artist,
    EditArtistRequest,
    InsertArtistArtworksRequest,
    InsertArtistCommentsRequest,
    InsertArtistsRequest,
} from "../../domain/Artist";
import { DisplayNameAsc } from "../../domain/Sorting";
import { buildApiUrl, doReqWithHandling } from "./Shared";

export const handleCreateArtists = async (r: InsertArtistsRequest) => {
    doReqWithHandling(
        "Edited artist!",
        async function () {
            await ky.post(buildApiUrl("/artists"), {
                credentials: "include",
                json: r,
            });
            await fetchArtistsToStore(DisplayNameAsc);
        },
        `/artists`,
    );
};

export const searchArtistsToStore = async (
    sortOrder: string,
    searchInput: string,
) => {
    doReqWithHandling(undefined, async function () {
        const res: { artists: Record<string, Artist>; sortOrder: [string] } =
            await ky(
                buildApiUrl(
                    `/artists/search/${searchInput}?sort-order=${sortOrder}&include=comments,opinions,artworks,artists`,
                ),
                { credentials: "include" },
            ).json();
        let mapped: Artist[] = Object.values(res.sortOrder).map(
            (x) => res.artists[x],
        );
        artistsHomePageItems.set(mapped);
    });
};

export const handleCreateArtistArtworks = async (
    r: InsertArtistArtworksRequest,
    identifier: string,
) => {
    doReqWithHandling("Added artwork!", async function () {
        await ky.post(buildApiUrl("/artists/artworks"), {
            credentials: "include",
            json: r,
        });
        await fetchArtistToStore(identifier);
    });
};

export const fetchArtistsToStore = async (sortOrder: string) => {
    doReqWithHandling(undefined, async function () {
        const res: {
            artists: Record<string, Artist>;
            sortOrder: [string];
        } = await ky(
            buildApiUrl(
                `/artists?sort-order=${sortOrder}&include=comments,opinions,artworks`,
            ),
            { credentials: "include" },
        ).json();
        const mapped: Artist[] = Object.values(res.sortOrder).map(
            (x) => res.artists[x],
        );
        artistsHomePageItems.set(mapped);
    });
};

export const fetchArtistToStore = async (identifier: string) => {
    doReqWithHandling(undefined, async function () {
        const res: { artists: Record<string, Artist> } = await ky(
            buildApiUrl(
                `/artists/identifier/${identifier}?include=comments,opinions,artworks`,
            ),
            {
                credentials: "include",
            },
        ).json();
        const artistData = Object.values(res.artists).at(0);
        activeArtistPage.set(artistData);
    });
};

export const handleDeleteArtist = async (identifier: string) => {
    const go = confirm(
        "Are you sure you wish to delete it?\nPress either OK or Cancel.",
    );
    if (go) {
        doReqWithHandling(
            "Deleted artist!",
            async function () {
                await ky.delete(buildApiUrl(`/artists/${identifier}`), {
                    credentials: "include",
                });
                await fetchArtistsToStore(DisplayNameAsc);
            },
            "/artists",
        );
    }
};

export const handleLikeArtist = async (identifier: string) => {
    const reqBody = {
        artistOpinions: [{ artistIdentifier: identifier, isLike: true }],
    };
    doReqWithHandling("Liked artist!", async function () {
        await ky.post(buildApiUrl("/artists/opinions"), {
            credentials: "include",
            json: reqBody,
        });
        await fetchArtistToStore(identifier);
    });
};

export const handleDislikeArtist = async (identifier: string) => {
    const reqBody = {
        artistOpinions: [{ artistIdentifier: identifier, isLike: false }],
    };
    doReqWithHandling("Disliked artist!", async function () {
        await ky.post(buildApiUrl("/artists/opinions"), {
            credentials: "include",
            json: reqBody,
        });
        await fetchArtistToStore(identifier);
    });
};

export const handleCreateArtistComments = async (e: any) => {
    const formData = new FormData(e.target);
    const reqBody: InsertArtistCommentsRequest = {
        artistComments: [
            {
                artistIdentifier: getOrIfEmptyUndefined(
                    "artistIdentifier",
                    formData,
                ),
                parentIdentifier: getOrIfEmptyUndefined(
                    "parentIdentifier",
                    formData,
                ),
                contents: getOrIfEmptyUndefined("contents", formData),
            },
        ],
    };
    doReqWithHandling("Placed comment!", async function () {
        await ky.post(buildApiUrl("/artists/comments"), {
            credentials: "include",
            json: reqBody,
        });
        await fetchArtistToStore(
            getOrIfEmptyUndefined("artistIdentifier", formData),
        );
    });
};

export const handleDeleteArtistArtwork = async (identifier: string) => {
    const go = confirm(
        "Are you sure you wish to delete it?\nPress either OK or Cancel.",
    );
    if (go) {
        doReqWithHandling("Deleted artist artwork!", async function () {
            await ky.delete(buildApiUrl(`/artists/artworks/${identifier}`), {
                credentials: "include",
            });
            await fetchArtistToStore(identifier);
        });
    }
};

export const handleArtistPositionChangeArtwork = async (
    identifier: string,
    newNum: number,
    songIdentifier: string,
) => {
    const reqBody = {
        artistArtworkOrders: [{ identifier: identifier, orderValue: newNum }],
    };
    doReqWithHandling("Edited artwork position!", async function () {
        await ky.patch(buildApiUrl("/artists/artworks/order"), {
            credentials: "include",
            json: reqBody,
        });
        await fetchArtistToStore(songIdentifier);
    });
};

export const handleEditArtist = async (
    r: EditArtistRequest,
    identifier: string,
) => {
    doReqWithHandling(
        "Edited artist!",
        async function () {
            await ky.patch(buildApiUrl("/artists/edit"), {
                credentials: "include",
                json: r,
            });
            await fetchArtistToStore(identifier);
        },
        `/artists/identifier/${identifier}`,
    );
};
