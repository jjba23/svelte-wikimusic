import { getOrIfEmptyUndefined } from "$lib/forms/Util";
import { activeGenrePage, genresHomePageItems } from "$lib/stores/genres";
import ky from "ky";
import type {
    EditGenreRequest,
    Genre,
    InsertGenreArtworksRequest,
    InsertGenreCommentsRequest,
    InsertGenreRequest,
} from "../../domain/Genre";
import { DisplayNameAsc } from "../../domain/Sorting";
import { buildApiUrl, doReqWithHandling } from "./Shared";

export const handleCreateGenres = async (r: InsertGenreRequest) => {
    doReqWithHandling(
        "Created genre!",
        async function () {
            await ky.post(buildApiUrl("/genres"), {
                credentials: "include",
                json: r,
            });
            await fetchGenresToStore(DisplayNameAsc);
        },
        "/genres",
    );
};

export const searchGenresToStore = async (
    sortOrder: string,
    searchInput: string,
) => {
    doReqWithHandling(undefined, async function () {
        const res: { genres: Record<string, Genre>; sortOrder: [string] } =
            await ky(
                buildApiUrl(
                    `/genres/search/${searchInput}?sort-order=${sortOrder}&include=comments,opinions,artworks,artists`,
                ),
                { credentials: "include" },
            ).json();
        let mapped: Genre[] = Object.values(res.sortOrder).map(
            (x) => res.genres[x],
        );
        genresHomePageItems.set(mapped);
    });
};

export const handleCreateGenreArtworks = async (
    r: InsertGenreArtworksRequest,
    identifier: string,
) => {
    doReqWithHandling("Created genre artwork!", async function () {
        await ky.post(buildApiUrl("/genres/artworks"), {
            credentials: "include",
            json: r,
        });
        await fetchGenreToStore(identifier);
    });
};

export const fetchGenresToStore = async (sortOrder: string) => {
    doReqWithHandling(undefined, async function () {
        const res: {
            genres: Record<string, Genre>;
            sortOrder: [string];
        } = await ky(
            buildApiUrl(
                `/genres?sort-order=${sortOrder}&include=comments,opinions,artworks`,
            ),
            { credentials: "include" },
        ).json();

        const mapped: Genre[] = Object.values(res.sortOrder).map(
            (x) => res.genres[x],
        );
        genresHomePageItems.set(mapped);
    });
};

export const fetchGenreToStore = async (identifier: string) => {
    doReqWithHandling(undefined, async function () {
        const res: { genres: Record<string, Genre> } = await ky(
            buildApiUrl(
                `/genres/identifier/${identifier}?include=comments,opinions,artworks`,
            ),
            {
                credentials: "include",
            },
        ).json();
        const genreData = Object.values(res.genres).at(0);
        activeGenrePage.set(genreData);
    });
};

export const handleDeleteGenre = async (identifier: string) => {
    const go = confirm(
        "Are you sure you wish to delete it?\nPress either OK or Cancel.",
    );
    if (go) {
        doReqWithHandling(
            "Deleted genre!",
            async function () {
                await ky.delete(buildApiUrl(`/genres/${identifier}`), {
                    credentials: "include",
                });
                await fetchGenresToStore(DisplayNameAsc);
            },
            "/genres",
        );
    }
};

export const handleLikeGenre = async (identifier: string) => {
    const reqBody = {
        genreOpinions: [{ genreIdentifier: identifier, isLike: true }],
    };
    doReqWithHandling("Liked genre!", async function () {
        await ky.post(buildApiUrl("/genres/opinions"), {
            credentials: "include",
            json: reqBody,
        });
        await fetchGenreToStore(identifier);
    });
};

export const handleDislikeGenre = async (identifier: string) => {
    const reqBody = {
        genreOpinions: [{ genreIdentifier: identifier, isLike: false }],
    };
    doReqWithHandling("Disliked genre!", async function () {
        await ky.post(buildApiUrl("/genres/opinions"), {
            credentials: "include",
            json: reqBody,
        });
        await fetchGenreToStore(identifier);
    });
};

export const handleCreateGenreComments = async (e: any) => {
    const formData = new FormData(e.target);
    const reqBody: InsertGenreCommentsRequest = {
        genreComments: [
            {
                genreIdentifier: getOrIfEmptyUndefined(
                    "genreIdentifier",
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
        await ky.post(buildApiUrl("/genres/comments"), {
            credentials: "include",
            json: reqBody,
        });
        await fetchGenreToStore(
            getOrIfEmptyUndefined("genreIdentifier", formData),
        );
    });
};

export const handleDeleteGenreArtwork = async (identifier: string) => {
    const go = confirm(
        "Are you sure you wish to delete it?\nPress either OK or Cancel.",
    );
    if (go) {
        doReqWithHandling("Deleted artwork!", async function () {
            await ky.delete(buildApiUrl(`/genres/artworks/${identifier}`), {
                credentials: "include",
            });
            await fetchGenresToStore(DisplayNameAsc);
        });
    }
};

export const handleGenrePositionChangeArtwork = async (
    identifier: string,
    newNum: number,
) => {
    const reqBody = {
        genreArtworkOrders: [{ identifier: identifier, orderValue: newNum }],
    };
    doReqWithHandling("Changed artwork position!", async function () {
        await ky.patch(buildApiUrl("/genres/artworks/order"), {
            credentials: "include",
            json: reqBody,
        });
        await fetchGenreToStore(identifier);
    });
};

export const handleEditGenre = async (
    r: EditGenreRequest,
    identifier: string,
) => {
    doReqWithHandling(
        "Edited genre!",
        async function () {
            await ky.patch(buildApiUrl("/genres/edit"), {
                credentials: "include",
                json: r,
            });
            await fetchGenreToStore(identifier);
        },
        `/genres/identifier/${identifier}`,
    );
};
