import { getOrIfEmptyUndefined } from "$lib/forms/Util";
import { activeSongPage, songsHomePageItems } from "$lib/stores/songs";
import type { NonEmptyString } from "io-ts-types";
import ky from "ky";
import type {
    EditSongContentsRequest,
    EditSongRequest,
    InsertSongArtworksRequest,
    InsertSongCommentsRequest,
    InsertSongContentsRequest,
    InsertSongsRequest,
    Song,
    UpdateSongArtistsRequest,
} from "../../domain/Song";
import { DisplayNameAsc } from "../../domain/Sorting";
import { buildApiUrl, doReqWithHandling } from "./Shared";

export const handleCreateSongs = async (r: InsertSongsRequest) => {
    doReqWithHandling(
        "Created song successfully",
        async function () {
            await ky.post(buildApiUrl("/songs"), {
                credentials: "include",
                json: r,
            });
            await fetchSongsToStore(DisplayNameAsc);
        },
        "/",
    );
};

export const handleCreateSongArtworks = async (
    r: InsertSongArtworksRequest,
    identifier: string,
) => {
    doReqWithHandling("Created song artwork successfully", async function () {
        await ky.post(buildApiUrl("/songs/artworks"), {
            credentials: "include",
            json: r,
        });
        await fetchSongToStore(identifier);
    });
};

export const fetchSongsToStore = async (sortOrder: string) => {
    doReqWithHandling(undefined, async function () {
        const res: { songs: Record<string, Song>; sortOrder: [string] } =
            await ky(
                buildApiUrl(
                    `/songs?sort-order=${sortOrder}&include=comments,opinions,artworks,artists`,
                ),
                { credentials: "include" },
            ).json();
        let mapped: Song[] = Object.values(res.sortOrder).map(
            (x) => res.songs[x],
        );
        songsHomePageItems.set(mapped);
    });
};

export const searchSongsToStore = async (
    sortOrder: string,
    searchInput: string,
) => {
    doReqWithHandling(undefined, async function () {
        const res: { songs: Record<string, Song>; sortOrder: [string] } =
            await ky(
                buildApiUrl(
                    `/songs/search/${searchInput}?sort-order=${sortOrder}&include=comments,opinions,artworks,artists`,
                ),
                { credentials: "include" },
            ).json();
        let mapped: Song[] = Object.values(res.sortOrder).map(
            (x) => res.songs[x],
        );
        songsHomePageItems.set(mapped);
    });
};

export const fetchSongToStore = async (identifier: string) => {
    doReqWithHandling(undefined, async function () {
        const res: { songs: Record<string, Song> } = await ky(
            buildApiUrl(
                `/songs/identifier/${identifier}?include=comments,opinions,artworks,artists,contents`,
            ),
            { credentials: "include" },
        ).json();
        const songData = Object.values(res.songs).at(0);
        activeSongPage.set(songData);
    });
};

export const handleDeleteSong = async (identifier: string) => {
    const go = confirm(
        "Are you sure you wish to delete it?\nPress either OK or Cancel.",
    );
    if (go) {
        doReqWithHandling(
            "Deleted song!",
            async function () {
                await ky.delete(buildApiUrl(`/songs/${identifier}`), {
                    credentials: "include",
                });
                await fetchSongsToStore(DisplayNameAsc);
            },
            "/",
        );
    }
};

export const handleLikeSong = async (identifier: string) => {
    const reqBody = {
        songOpinions: [{ songIdentifier: identifier, isLike: true }],
    };
    doReqWithHandling("Liked song!", async function () {
        await ky.post(buildApiUrl("/songs/opinions"), {
            credentials: "include",
            json: reqBody,
        });
        await fetchSongToStore(identifier);
    });
};

export const handleDislikeSong = async (identifier: string) => {
    const reqBody = {
        songOpinions: [{ songIdentifier: identifier, isLike: false }],
    };
    doReqWithHandling("Disliked song!", async function () {
        await ky.post(buildApiUrl("/songs/opinions"), {
            credentials: "include",
            json: reqBody,
        });
        await fetchSongToStore(identifier);
    });
};

export const handleCreateSongComments = async (e: any) => {
    const formData = new FormData(e.target);
    const reqBody: InsertSongCommentsRequest = {
        songComments: [
            {
                songIdentifier: getOrIfEmptyUndefined(
                    "songIdentifier",
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
    doReqWithHandling("Posted comment!", async function () {
        await ky.post(buildApiUrl("/songs/comments"), {
            credentials: "include",
            json: reqBody,
        });
        await fetchSongToStore(
            getOrIfEmptyUndefined("songIdentifier", formData),
        );
    });
};

export const handleCreateSongArtists = async (
    artistIdentifiers: NonEmptyString[],
    songIdentifier: NonEmptyString,
) => {
    const reqBody: UpdateSongArtistsRequest = {
        songArtists: Object.values(artistIdentifiers).map(
            (artistIdentifier) => {
                return {
                    artistIdentifier: artistIdentifier,
                    songIdentifier: songIdentifier,
                };
            },
        ),
    };
    doReqWithHandling("Updated artists of song!", async function () {
        await ky.post(buildApiUrl("/songs/artists"), {
            credentials: "include",
            json: reqBody,
        });
        await fetchSongToStore(songIdentifier);
    });
};

export const handleDeleteSongArtwork = async (identifier: string) => {
    const go = confirm(
        "Are you sure you wish to delete it?\nPress either OK or Cancel.",
    );
    if (go) {
        doReqWithHandling("Deleted song artwork!", async function () {
            await ky.delete(buildApiUrl(`/songs/artworks/${identifier}`), {
                credentials: "include",
            });
            await fetchSongToStore(identifier);
        });
    }
};

export const handleDeleteSongContent = async (identifier: string) => {
    const go = confirm(
        "Are you sure you wish to delete it?\nPress either OK or Cancel.",
    );
    if (go) {
        doReqWithHandling("Deleted song version!", async function () {
            await ky.delete(buildApiUrl(`/songs/contents/${identifier}`), {
                credentials: "include",
            });
            await fetchSongToStore(identifier);
        });
    }
};

export const handlePositionChangeArtwork = async (
    identifier: string,
    newNum: number,
    songIdentifier: string,
) => {
    const reqBody = {
        songArtworkOrders: [{ identifier: identifier, orderValue: newNum }],
    };
    doReqWithHandling("Changed song artwork position!", async function () {
        await ky.patch(buildApiUrl("/songs/artworks/order"), {
            credentials: "include",
            json: reqBody,
        });
        await fetchSongToStore(songIdentifier);
    });
};

export const handleEditSong = async (
    r: EditSongRequest,
    identifier: string,
) => {
    doReqWithHandling(
        "Created song successfully",
        async function () {
            await ky.patch(buildApiUrl("/songs/edit"), {
                credentials: "include",
                json: r,
            });
            await fetchSongToStore(identifier);
        },
        `/songs/identifier/${identifier}`,
    );
};

export const handleCreateSongContents = async (
    r: InsertSongContentsRequest,
    songIdentifier: string,
) => {
    doReqWithHandling(
        "Created song contents successfully",
        async function () {
            await ky.post(buildApiUrl("/songs/contents"), {
                credentials: "include",
                json: r,
            });
            await fetchSongToStore(songIdentifier);
        },
        `/songs/identifier/${songIdentifier}`,
    );
};

export const handleEditSongContents = async (
    r: EditSongContentsRequest,
    songIdentifier: string,
) => {
    doReqWithHandling(
        "Edited song successfully",
        async function () {
            await ky.patch(buildApiUrl("/songs/contents"), {
                credentials: "include",
                json: r,
            });
            await fetchSongToStore(songIdentifier);
        },
        `/songs/identifier/${songIdentifier}`,
    );
};
