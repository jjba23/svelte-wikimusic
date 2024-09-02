import type { ThreadRender } from "./Thread";
import type { ValidationResult } from "./Validation";

export interface Genre {
    identifier: string;
    displayName: string;
    createdBy: string;
    visibilityStatus: number;
    approvedBy: string | null;
    createdAt: Date;
    lastEditedAt: Date | undefined;
    artworks: Record<string, GenreArtwork>;
    comments: [ThreadRender<GenreComment>];
    opinions: Record<string, GenreOpinion>;
    spotifyUrl: string | null;
    youtubeUrl: string | null;
    soundcloudUrl: string | null;
    wikipediaUrl: string | null;
}

export interface GenreOpinion {
    identifier: string;
    genreIdentifier: string;
    createdBy: string;
    isLike: boolean;
    isDislike: boolean;
    createdAt: Date;
    lastEditedAt: Date | undefined;
}

export interface GenreArtwork {
    identifier: string;
    genreIdentifier: string;
    createdBy: string;
    visibilityStatus: number;
    approvedBy: string | null;
    contentType: string;
    contentUrl: string;
    contentCaption: string | null;
    createdAt: Date;
    lastEditedAt: Date | undefined;
    orderValue: number;
}

export interface GenreComment {
    identifier: string;
    genreIdentifier: string;
    parentIdentifier: string | null;
    createdBy: string;
    visibilityStatus: number;
    contents: string;
    approvedBy: string | null;

    createdAt: Date;
    lastEditedAt: Date | undefined;
}

export interface InsertGenreRequestItem {
    displayName: string;
    spotifyUrl: string | null;
    youtubeUrl: string | null;
    soundcloudUrl: string | null;
    wikipediaUrl: string | null;
}

export interface InsertGenreRequest {
    genres: InsertGenreRequestItem[];
}

export interface InsertGenreArtworksResponse {
    genreArtworks: Record<string, GenreArtwork>;
    sortOrder: [string];
    validationResults: Record<string, ValidationResult>;
}

export interface InsertGenreArtworksRequestItem {
    genreIdentifier: string;
    contentUrl: string;
    contentCaption: string | null;
    orderValue: number;
}

export interface InsertGenreArtworksRequest {
    genreArtworks: InsertGenreArtworksRequestItem[];
}

export interface InsertGenreCommentsRequestItem {
    genreIdentifier: string;
    parentIdentifier: string | null;
    contents: string;
}

export interface InsertGenreCommentsRequest {
    genreComments: InsertGenreCommentsRequestItem[];
}

export interface GenreDelta {
    displayName: string | null;
    spotifyUrl: string | null;
    youtubeUrl: string | null;
    soundcloudUrl: string | null;
    wikipediaUrl: string | null;
}

export interface EditGenre extends InsertGenreRequestItem {
    identifier: string;
}

export interface EditGenreRequest {
    genreDeltas: [EditGenre];
}
