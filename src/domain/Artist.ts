import type { ThreadRender } from "./Thread";
import type { ValidationResult } from "./Validation";

export interface Artist {
    identifier: string;
    displayName: string;
    createdBy: string;
    visibilityStatus: number;
    approvedBy: string | null;
    createdAt: Date;
    lastEditedAt: Date | undefined;
    artworks: Record<string, ArtistArtwork>;
    comments: [ThreadRender<ArtistComment>];
    opinions: Record<string, ArtistOpinion>;
    spotifyUrl: string | null;
    youtubeUrl: string | null;
    soundcloudUrl: string | null;
    wikipediaUrl: string | null;
}

export interface ArtistOpinion {
    identifier: string;
    artistIdentifier: string;
    createdBy: string;
    isLike: boolean;
    isDislike: boolean;
    createdAt: Date;
    lastEditedAt: Date | undefined;
}

export interface ArtistArtwork {
    identifier: string;
    artistIdentifier: string;
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

export interface ArtistComment {
    identifier: string;
    artistIdentifier: string;
    parentIdentifier: string | null;
    createdBy: string;
    visibilityStatus: number;
    contents: string;
    approvedBy: string | null;
    createdAt: Date;
    lastEditedAt: Date | undefined;
}

export interface InsertArtistsRequestItem {
    displayName: string;
    spotifyUrl: string | null;
    youtubeUrl: string | null;
    soundcloudUrl: string | null;
    wikipediaUrl: string | null;
}

export interface InsertArtistsRequest {
    artists: InsertArtistsRequestItem[];
}

export interface InsertArtistArtworksResponse {
    artistArtworks: Record<string, ArtistArtwork>;
    sortOrder: [string];
    validationResults: Record<string, ValidationResult>;
}

export interface InsertArtistArtworksRequestItem {
    artistIdentifier: string;
    contentUrl: string;
    contentCaption: string | null;
    orderValue: number;
}

export interface InsertArtistArtworksRequest {
    artistArtworks: InsertArtistArtworksRequestItem[];
}

export interface InsertArtistCommentsRequestItem {
    artistIdentifier: string;
    parentIdentifier: string | null;
    contents: string;
}

export interface InsertArtistCommentsRequest {
    artistComments: InsertArtistCommentsRequestItem[];
}

export interface EditArtist extends InsertArtistsRequestItem {
    identifier: string;
}

export interface EditArtistRequest {
    artistDeltas: [EditArtist];
}
